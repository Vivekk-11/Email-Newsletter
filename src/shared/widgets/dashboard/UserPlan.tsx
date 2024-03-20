"use client";
import { manageSubscription } from "@/actions/manage.subscription";
import useGetMembership from "@/shared/hooks/useGetMembership";
import useSubscribers from "@/shared/hooks/useSubscribers";
import { ICONS } from "@/shared/utils/icons";
import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/navigation";

const UserPlan = () => {
  const { loading, subscribers } = useSubscribers();
  const { loading: membershipLoading, data: membershipData } =
    useGetMembership();
  const router = useRouter();

  const handleManage = async () => {
    const response = await manageSubscription({
      customerId: membershipData?.stripeCustomerId,
    });
    if (response?.responseUrl && response.status === "success") {
      router.push(response.responseUrl);
    }
  };

  return (
    <div className="w-full my-3 p-3 bg-[#FDF1F8] rounded hover:shadow-xl cursor-pointer">
      <div className="w-full flex items-center">
        <h5 className="text-lg font-medium">{membershipData?.plan} Plan</h5>
        <div className="w-[95px] shadow ml-2 cursor-pointer h-[32px] flex justify-center items-center space-x-1 rounded-lg bg-[#E77CAE]">
          <span className="text-white text-xl">{ICONS.electric}</span>
          <span className="text-white text-sm" onClick={handleManage}>
            Upgrade
          </span>
        </div>
      </div>
      <h5 className="text-[#831743]">Total subscribers</h5>
      <Slider
        aria-label="Player progress"
        hideThumb={true}
        defaultValue={subscribers?.length}
        className="max-w-md"
      />
      <h6 className="text-[#831743]">
        {loading ? "..." : subscribers?.length} of 2500 added
      </h6>
    </div>
  );
};

export default UserPlan;
