const lendMonyAddress = "0x5e79f5140393c0809fbe229f6cc808044318f73c";

const lendMonyABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "fundLoan",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "lender",
				"type": "address"
			}
		],
		"name": "LoanFunded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			}
		],
		"name": "LoanRepaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "LoanRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "repayLoan",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_interest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_durationInSeconds",
				"type": "uint256"
			}
		],
		"name": "requestLoan",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "getLoan",
		"outputs": [
			{
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "lender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "interest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "funded",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "repaid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLoanCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "loans",
		"outputs": [
			{
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "lender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "interest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "funded",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "repaid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let account;
let lendMonyContract;

window.onload = async function () {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    lendMonyContract = new web3.eth.Contract(lendMonyABI, lendMonyAddress);
    
    await displayWalletAddress();

    if (!(await checkWalletConnection())) {
      showMessage("Please connect your wallet", "red");
      return;
    }

    autoRefreshLoanStats();
  } else {
    alert("MetaMask is required to use this dApp.");
  }
};

async function checkWalletConnection() {
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  if (accounts.length === 0) {
    alert("Please connect your MetaMask wallet.");
    return false;
  }

  return true;
}

async function displayWalletAddress() {
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const walletText = accounts.length > 0 ? ` ${accounts[0]}` : " Not Connected";
  const walletElem = document.getElementById("wallet-address");
  if (walletElem) walletElem.innerText = walletText;
}

function logout() {
  showMessage("Disconnected from wallet. Logging out...");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}

function showMessage(msg, color = "#2ecc71") {
  const msgBox = document.getElementById("message");
  msgBox.style.display = "block";
  msgBox.style.background = color === "red" ? "#fbeaea" : "#eafaf1";
  msgBox.style.borderColor = color === "red" ? "#e74c3c" : "#2ecc71";
  msgBox.style.color = color === "red" ? "#c0392b" : "#27ae60";
  msgBox.innerText = msg;
  setTimeout(() => {
    msgBox.style.display = "none";
  }, 4000);
}

  async function requestLoan() {
    if (!(await checkWalletConnection())) return;

    const ethAmount = document.getElementById("loan-amount").value;
    const ethInterest = document.getElementById("loan-interest").value;
    const days = document.getElementById("loan-duration").value;

    const amountWei = web3.utils.toWei(ethAmount, "ether");
    const interestWei = web3.utils.toWei(ethInterest, "ether");
    const durationSeconds = days * 24 * 60 * 60;

    showMessage("Submitting loan request...");
    try {
      await lendMonyContract.methods.requestLoan(amountWei, interestWei, durationSeconds)
        .send({ from: account });

      showMessage("Loan request submitted!");
    } catch (err) {
      console.error(err);
      showMessage("Error submitting loan request.", "red");
    }
  }

async function autoRefreshLoanStats() {
  if (!lendMonyContract) return;

	try {
	    const count = await lendMonyContract.methods.getLoanCount().call();
	    let activeCount = 0;
	
	    for (let i = 0; i < count; i++) {
	      const loan = await lendMonyContract.methods.getLoan(i).call();
	      if (loan.funded && !loan.repaid) {
	        activeCount++;
	      }
	    }
	
			const loanCount = document.getElementById("loan-count");
  		if (loanCount) loanCount.innerText = activeCount;
  		
	  } catch (err) {
	    console.error("Error fetching loan stats", err);
	  }
}

setInterval(autoRefreshLoanStats, 15000);

function animateCount(id, endVal) {
  const element = document.getElementById(id);
  let start = 0;
  const duration = 100;
  const increment = endVal / 40;

  const interval = setInterval(() => {
    start += increment;
    if (start >= endVal) {
      element.innerText = endVal;
      clearInterval(interval);
    } else {
      element.innerText = Math.floor(start);
    }
  }, duration / 40);
}

let lendMonyAnalyticsContract;
const lendMonyAnalyticsAddress = '0xa9c4b50118fa320E246d6D6f121aC04B922EeE9c';
const lendMonyAnalyticsABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_lendMonyAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getActiveLoanCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "activeCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			}
		],
		"name": "getBorrowerActiveLoanCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			}
		],
		"name": "getBorrowerLoanCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			}
		],
		"name": "getBorrowerRepaidLoanCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRepaidLoanCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "repaidCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalLoans",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "total",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lendMony",
		"outputs": [
			{
				"internalType": "contract ILendMony",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function loadMyStats() {
	const [total, active, repaid] = await Promise.all([
		lendMonyAnalyticsContract.methods.getBorrowerLoanCount(account).call(),
		lendMonyAnalyticsContract.methods.getBorrowerActiveLoanCount(account).call(),
		lendMonyAnalyticsContract.methods.getBorrowerRepaidLoanCount(account).call()
	]);
	
	animateCount("my-loans", parseInt(total));
	animateCount("my-active-loans", parseInt(active));
	animateCount("my-repaid-loans", parseInt(repaid));
	
	renderLoanChart(active, repaid);
}

function renderLoanChart(active, repaid) {
  const ctx = document.getElementById("loanChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Active", "Repaid"],
      datasets: [{
        data: [active, repaid],
        backgroundColor: ["#5e60ce", "#2ecc71"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

