export function Mbutton({ mbcontent }) {
  return (
    <div className="m-2">
      <button
        type="submit"
        className="bg-yellow-300 hover:bg-yellow-600 text-black 
      font-bold py-2 px-4 rounded-3xl cursor-pointer"
      >
        {mbcontent}
      </button>
    </div>
  );
}
