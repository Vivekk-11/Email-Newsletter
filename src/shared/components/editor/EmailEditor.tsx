"use client";
import {
  EditorRef,
  EmailEditorProps,
  EmailEditor as EmailEdit,
} from "react-email-editor";
import React, { useState, useRef, useEffect } from "react";
import { DefaultJsonData } from "@/assets/mails/default";
import { useClerk } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { NextResponse } from "next/server";
import { Button } from "@nextui-org/react";
import { saveEmail } from "@/actions/save.email";
import { getEmailDetails } from "@/actions/get.email.details";
import { sendEmail } from "@/shared/utils/email.sender";

const EmailEditor = ({ subjectTitle }: { subjectTitle: string }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [jsonData, setJsonData] = useState<null | any>(DefaultJsonData);
  const { user } = useClerk();
  const emailEditorRef = useRef<EditorRef>(null);
  const history = useRouter();

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;
      setJsonData(design);
      sendEmail({
        userEmail: ["fearlesswarrior1771@gmail.com"],
        content: html,
        subject: subjectTitle,
      })
        .then(() => {
          toast.success("Sent email successfully!");
          history.push("/dashboard/write");
        })
        .catch((error) =>
          console.log(`Error while sending the email:- ${error}`)
        );
    });
  };

  const onReady: EmailEditorProps["onReady"] = () => {
    const unlayer: any = emailEditorRef.current?.editor;
    unlayer.loadDesign(jsonData);
  };

  const saveDraft = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design } = data;
      await saveEmail({
        title: subjectTitle,
        content: JSON.stringify(design),
        newsletterOwnerId: user?.id!,
      }).then((res: any) => {
        toast.success(res.message);
        history.push("/dashboard/write");
      });
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const emailDetails = await getEmailDetails({
          title: subjectTitle,
          newsletterOwnerId: user?.id!,
        });
        if (emailDetails) {
          setJsonData(JSON.parse(emailDetails.content));
        }
        setLoading(false);
      } catch (error) {
        console.log(`Error while fetching the email details:- ${error}`);
        setLoading(false);
      }
    })();
  }, [user, subjectTitle]);

  return (
    <>
      {!loading && (
        <div className="w-full relative h-[90vh]">
          <EmailEdit
            minHeight={"80vh"}
            ref={emailEditorRef}
            onReady={onReady}
          />
          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            <Button
              className="bg-transparent cursor-pointer flex items-center gap-1 text-black border border-[#00000048] text-lg rounded-lg"
              onClick={saveDraft}
            >
              <span className="opacity-[.7]">Save Draft</span>
            </Button>
            <Button
              className="bg-[#000] text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={exportHtml}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailEditor;
