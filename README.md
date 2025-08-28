# 💸 LendMooony – A Decentralised Lending Platform

LendMooony is a decentralised, peer-to-peer lending platform built on the Ethereum Sepolia testnet. It enables users to request, fund, and repay loans directly via smart contracts without intermediaries. The application leverages MetaMask for wallet-based login, Web3.js for contract interaction, and AWS Elastic Beanstalk for scalable deployment.

---

## 🚀 Features

- 🧾 **Loan Request** – Borrowers can request loans by specifying amount, interest, and duration.
- 💰 **Loan Funding** – Lenders can view and fund available loan requests using ETH.
- 🔁 **Loan Repayment** – Borrowers can repay their loans (principal + interest) securely.
- 📊 **Dashboard Analytics** – Visual overview of loan stats with animated counters and pie charts.
- ⛽ **Gas & Transaction Data** – Real-time gas prices and recent transaction history via Etherscan API.
- 🔐 **MetaMask Integration** – Secure login and transaction signing with wallet verification.
- ☁️ **AWS Deployment** – Hosted on AWS Elastic Beanstalk with CI/CD via GitHub Actions.

---

## 🛠️ Technologies Used

| Tool / Tech           | Purpose                                         |
|------------------------|-------------------------------------------------|
| **Solidity**           | Smart contract development                      |
| **Remix Ethereum IDE** | Writing and deploying contracts on Sepolia      |
| **MetaMask**           | User login and Web3 transaction signing         |
| **Web3.js**            | Frontend interaction with smart contracts       |
| **Node.js + Express.js** | Backend server and route management           |
| **EJS**                | Server-side rendering of HTML templates         |
| **Chart.js**           | Data visualization (loan stats & pie charts)    |
| **Etherscan API**      | Fetching gas prices and wallet transactions     |
| **AWS Elastic Beanstalk** | Hosting Node.js app in the cloud           |
| **GitHub Actions**     | CI/CD for auto deployment to AWS                |

---

## 🧪 Smart Contracts

Deployed on **Ethereum Sepolia Testnet**:

- `LendMony.sol`: Core lending contract for request, fund, and repayment logic.
- `LendMonyAnalytics.sol`: Contract for tracking and reading loan metrics.

You can test contracts using **Remix IDE** or integrate them using ABI + address in `web3-app.js`.

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/LendMooony.git
cd LendMooony
