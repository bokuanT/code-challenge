/* Referenced https://www.material-tailwind.com/docs */
import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";
import { getPrice } from "../../api/index"
import ReactDOM from "react-dom";

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

export default function ConversionInterface() {
  const [youPay, setYouPay] = useState(0);
  const [youRecieve, setYouRecieve] = useState(0);
  const [payCurrency, setPayCurrency] = useState("ETH");
  const [recieveCurrency, setRecieveCurrency] = useState("USD");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCurrencyType, setSelectedCurrencyType] = useState(null);
  const [youPayCurrencyPrice, setYouPayCurrencyPrice] = useState(null);
  const [youRecieveCurrencyPrice, setYouRecieveCurrencyPrice] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const alertRoot = useRef(document.getElementById('alert-root'));

  useEffect(() => {
    async function fetchPrice() {
      try {
          const data = await getPrice(payCurrency);
          console.log(data); // Log the data to see its structure
          setYouPayCurrencyPrice(roundToTwo(data.price));
      } catch (error) {
          console.log(error);
          // If is null error, set to 0
          setYouPayCurrencyPrice(0);
          setShowAlert(true);
          setAlertMessage("Error fetching price");
      }
    }
    fetchPrice();
  }, [payCurrency]);

  useEffect(() => {
    async function fetchPrice() {
        try {
          const data = await getPrice(recieveCurrency);
          console.log(data); // Log the data to see its structure
          setYouRecieveCurrencyPrice(roundToTwo(data.price));
        } catch (error) {
          console.log(error);
          // If is null error, set to 0
          setYouRecieveCurrencyPrice(0);
          setShowAlert(true);
          setAlertMessage("Error fetching price");
        }
    }

    fetchPrice();
  }, [recieveCurrency]);

  useEffect(() => {
    // Set to 0 if youPayCurrencyPrice is NaN
    const recieved = roundToTwo(youPay * youPayCurrencyPrice / youRecieveCurrencyPrice) 
      ? roundToTwo(youPay * youPayCurrencyPrice / youRecieveCurrencyPrice) : 0;
    setYouRecieve(recieved);
  }, [youPay, youPayCurrencyPrice, youRecieveCurrencyPrice]);

  const availableCurrencies = [
    "BLUR", "bNEO", "BUSD", "USD", "ETH", "GMX", "STEVMOS", "LUNA", 
    "RATOM", "STRD", "EVMOS", "IBCX", "IRIS", "ampLUNA", "KUJI", 
    "STOSMO", "USDC", "axlUSDC", "ATOM", "STATOM", "OSMO", "rSWTH", 
    "STLUNA", "LSI", "OKB", "OKT", "SWTH", "USC", "WBTC", "wstETH", 
    "YieldUSD", "ZIL"
  ];

  const handleOpenDialog = (type) => {
    setSelectedCurrencyType(type);
    setOpenDialog(true);
  };

  const handleSelectCurrency = (currency) => {
    if (selectedCurrencyType === "pay") {
      setPayCurrency(currency);
    } else {
      setRecieveCurrency(currency);
    }
    setOpenDialog(false);
  };

  const handleYouPayChange = (event) => {
    setYouPay(event.target.value);
  };

  const handleYouRecieveChange = (event) => {
    setYouRecieve(event.target.value);
  };

  return (
    <div className="my-4 w-full max-w-screen-md">
      {showAlert && ReactDOM.createPortal(
        <Alert
          open={showAlert}
          onClose={() => setShowAlert(false)}
          className="rounded-none border-l-4 border-[#e53e3e] bg-[#e53e3e]/10 font-medium text-[#e53e3e]"
        >
          {alertMessage}
        </Alert>,
        alertRoot.current
      )}
      <div className="flex items-center mb-2 space-x-4">
        <Input 
          label="You pay" 
          className="flex-1" 
          value={youPay} 
          onChange={handleYouPayChange} 
        />
        <Button onClick={() => handleOpenDialog("pay")}>{payCurrency}</Button>
      </div>
      <Typography color="blue-gray">
        {youPayCurrencyPrice ? `Price: $${youPayCurrencyPrice}` : '-'}
      </Typography>
      <div className="flex justify-center items-center h-full pb-2">  
        <Typography variant="h6" color="blue-gray" className="mx-2">
          ⇆
        </Typography>
      </div>
      <div className="flex items-center mb-2 space-x-4">
        <Input 
          label="You recieve" 
          className="flex-1" 
          value={youRecieve} 
          onChange={handleYouRecieveChange} 
        />
        <Button onClick={() => handleOpenDialog("receive")}>{recieveCurrency}</Button>
      </div>
      <Typography color="blue-gray">
        {youRecieveCurrencyPrice ? `Price: $${youRecieveCurrencyPrice}` : '-'}
      </Typography>

      {/* Dialog */}
      <Dialog open={openDialog} handler={() => setOpenDialog(false)}>
        <DialogHeader>Select a Currency</DialogHeader>
        <DialogBody divider>
          <div className="h-64 overflow-y-auto"> {/* Adjust the height (h-64) as needed */}
            {availableCurrencies.map((currency) => (
              <div key={currency} className="mb-2"> {/* Adds a margin to the bottom of each button */}
                <Button
                  variant="text"
                  onClick={() => handleSelectCurrency(currency)}
                  className="w-full" 
                >
                  {currency}
                </Button>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
