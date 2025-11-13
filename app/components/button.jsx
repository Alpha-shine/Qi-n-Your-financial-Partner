"use client";
export default function Button(content) {
  // const handleNotification(){
  //   return(
  //   console.log(`${content.innerText} button has been clicked`)
  //   )
  // }
  return (
    <button className="px-3 py-1 bg-gray-50 rounded-lg ">
      {content.innerText}
    </button>
  );
}
