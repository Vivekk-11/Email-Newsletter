type ZeroBounceResponse = any;

const baseUrl = "https://api.zerobounce.net/v2";

export const validateEmail = async ({
  email,
}: {
  email: string;
}): Promise<ZeroBounceResponse> => {
  const uri = `${baseUrl}/validate?api_key=${process.env.ZERO_BOUNCE_API_KEY}&email=${email}`;
  try {
    const response = await fetch(uri, { method: "GET" });
    if (response.ok) {
      const data: ZeroBounceResponse = await response.json();
      return data;
    }
  } catch (error) {
    console.log(`Error while validating the email:- ${error}`);
  }
};
