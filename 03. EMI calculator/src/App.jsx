import { useState } from "react";

function App() {
  const tenures = [12, 24, 36, 48, 60];

  const [cost, setCost] = useState(0);
  const [rateOfInterest, setRateOfInterest] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [emiPerMonth, setEmiPerMonth] = useState(0);
  const [tenure, setTenure] = useState(tenures[0]);

  return (
    <div className="app">
      <h1>EMI Calculator</h1>

      <div>
        <div className="input-container">
          <label htmlFor="totalCost">Total cost of asset</label>
          <input
            placeholder="Enter total cost of asset"
            type="number"
            id="totalCost"
            value={cost}
            min={0}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="rateOfInterest">Rate of interest</label>
          <input
            placeholder="Enter rate of interest"
            type="number"
            id="rateOfInterest"
            value={rateOfInterest}
            min={0}
            max={100}
            onChange={(e) => setRateOfInterest(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="processingFee">Processing Fee ( in % )</label>
          <input
            placeholder="Enter processing Fee ( in % )"
            type="number"
            id="processingFee"
            value={processingFee}
            min={0}
            max={100}
            onChange={(e) => setProcessingFee(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="downPayment">Down Payment</label>
          <input
            type="range"
            id="downPayment"
            value={downPayment}
            min={0}
            max={100}
            onChange={(e) => setDownPayment(e.target.value)}
          />
          <div className="input-container__range-values">
            <label>{`0 %`}</label>
            <label>{downPayment}</label>
            <label>{`100 %`}</label>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="emiPerMonth">Loan Per Month</label>
          <input
            type="range"
            id="emiPerMonth"
            value={emiPerMonth}
            min={0}
            max={cost ?? 0}
            onChange={(e) => setEmiPerMonth(e.target.value)}
          />
          <div className="input-container__range-values">
            <label>{`0 %`}</label>
            <label>{downPayment}</label>
            <label>{`100 %`}</label>
          </div>
        </div>

        <div>
          <label>Tenure (in months)</label>
          <div className="button-container">
            {tenures.map((t) => (
              <button
                key={t}
                className={`${t === tenure ? "selected" : ""}`}
                onClick={() => setTenure(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
