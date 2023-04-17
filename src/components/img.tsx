export const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getImgsFromServer = async () =>{
    const response = await fetch(`${BaseUrl}/image`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
}