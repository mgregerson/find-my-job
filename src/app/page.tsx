import Image from "next/image";

export default function Home() {
  console.log(process.env.GITHUB_ID);
  return (
    <>
      <div className="container mx-auto px-4">
        <h1>Hello word</h1>
        <p>This is a content to make our page longer</p>
        <div className="w-full h-screen bg-green-300"></div>
        <p>Lorem Ipsum is simply dummy text ...</p>
      </div>
    </>
  );
}
