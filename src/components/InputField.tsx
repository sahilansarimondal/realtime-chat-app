export default function InputField() {
    return (
        <div className="flex ">
          <input
            className=" border-slate-400 bg-slate-200 border-2 rounded-xl w-full px-3 py-1 active:border-blue-300 "
            type="text"
            placeholder="message"
          />
          <button className="bg-blue-500 text-white rounded-xl px-3 py-1 ml-3 hover:bg-blue-600 ">
            Send
          </button>
        </div>
    );
  }
  