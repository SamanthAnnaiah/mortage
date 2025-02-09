import { useContext, useEffect, useState } from "react";
import { Inpelement } from "../components/Inpelement";
import { Relement } from "../components/Relement";
import { Mbutton } from "../components/Mbutton";
import { MortContext } from "../contexts/MortProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [mtypestate, setmtypestate] = useState(-1);
  let [mortoutput, setmortoutput] = useState(0);
  useEffect(() => {
    document.title = "Mortage Application";
  }, []);
  let {
    mortgage,
    interest,
    years,
    mortgagetype,
    updateMortgage,
    updateInterest,
    updateYears,
    updatemortgagetype,
    emes,
  } = useContext(MortContext);

  let monthlyRepayment = (mortgage, interest, years) => {
    let monthlyInterest = interest / 1200;
    let months = years * 12;
    let monthlyRepayment = 0;
    if (monthlyInterest === 0) {
      monthlyRepayment = mortgage / months;
    } else {
      monthlyRepayment =
        (mortgage * monthlyInterest) /
        (1 - Math.pow(1 + monthlyInterest, -months));
    }
    return Number(monthlyRepayment.toFixed(2));
  };
  let monthlyRepaymentInterestOnly = (mortgage, interest) => {
    return Number(((mortgage * interest) / 1200).toFixed(2));
  };

  return (
    <>
      <div
        className="bg-white shadow-md flex items-center 
      justify-center h-[500px] w-[50%] m-auto mt-10 rounded-[20px]"
      >
        <div className="w-[50%] flex flex-col items-start justify-start gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted");
              console.log(mortgage, interest, years, mortgagetype);
              switch (mortgagetype) {
                case "0":
                  setmtypestate(0);
                  let t1 = monthlyRepayment(mortgage, interest, years);
                  setmortoutput(t1);
                  break;
                case "1":
                  setmtypestate(1);
                  let t2 = monthlyRepaymentInterestOnly(mortgage, interest);
                  setmortoutput(t2);
                  break;
                default:
                  setmtypestate(-1);
                  break;
              }
              if (
                emes.merror != -1 ||
                mortgage == 0 ||
                interest == 0 ||
                years == 0 ||
                mortgage == "" ||
                interest == "" ||
                years == "" ||
                mortgage == " " ||
                interest == " " ||
                years == " " ||
                mortgagetype == -1 ||
                mortgagetype == "" ||
                mortgagetype == " "
              ) {
                toast.error("🦄 Please correct the errors on the form!", {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                return;
              }
              toast.success("🦄 Calculating....", {
                position: "top-right",
                autoClose: 3000, // Time in ms before it closes
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
              });
            }}
          >
            <div className="flex flex-row justify-between items-center w-[95%] gap-1 m-2">
              <h1 className="text-[1.2rem] font-bold text-slate-900">
                Mortage Application
              </h1>
              <div className="text-sm text-slate-600/70 underline cursor-pointer">
                Clear all
              </div>
            </div>
            <Inpelement
              iname="mamount"
              inameLabel="Mortgage Amount"
              fcol={true}
              lwidth="100"
              iwidth="100"
              sname="£"
              istate={mortgage}
              istatemethod={updateMortgage}
              ifocus={true}
              inpmin="1000"
              inpmax="100000000"
            />
            <div className="flex flex-row items-center justify-start">
              <Inpelement
                iname="mterm"
                inameLabel="Mortgage Term"
                fcol={true}
                sname="years"
                istate={years}
                istatemethod={updateYears}
                inpmin="1"
                inpmax="25"
              />
              <Inpelement
                iname="mrate"
                inameLabel="Mortgage Rate"
                fcol={true}
                sname="%"
                istate={interest}
                istatemethod={updateInterest}
                inpmin="1"
                inpmax="30"
              />
            </div>
            <Relement
              iname="mtype"
              inameLabel="Mortgage Type"
              fcol={true}
              istate={mortgagetype}
              istatemethod={updatemortgagetype}
            />
            <Mbutton mbcontent="🧮 Calculate Repayments" />
          </form>
        </div>

        <div
          className="w-[50%] h-[100%] bg-slate-900 rounded-[20px] 
        rounded-bl-[60px] rounded-tl-none ml-2 flex flex-col items-start justify-start gap-4"
        >
          <div>
            <div className="text-[1.2rem] font-bold text-white m-2">
              Your results
            </div>
            <div className="text-[0.7rem] font-bold text-white/65 m-2 leading-5">
              Your results are shown based on the information you provided.To
              adjust the results, edit the form and click "Calculate Repayments"
              again.
            </div>
          </div>
          <div
            className="flex flex-col items-start justify-start w-[85%] h-[60%] 
          gap-1 bg-slate-700 rounded-lg m-5
          shadow-lg shadow-yellow-300"
          >
            <div className="text-white/60 m-3">Your Monthly repayments</div>
            <div className="m-3 text-5xl text-yellow-300 font-bold">
              £ &nbsp; <span>{mortoutput}</span>
            </div>
            <hr className="w-[90%] border-t border-gray-300 m-1" />
            <div className="text-white/60 ml-3">
              Total you'll pay over the term as {` `}
              {mtypestate == 0
                ? "Repayment"
                : mtypestate == 1
                ? "Interest only"
                : " "}
            </div>
            <div className="ml-3 text-lg text-white/65 font-bold">
              <span className="text-white text-3xl font-bold">
                £ &nbsp; {(mortoutput * (years * 12)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
