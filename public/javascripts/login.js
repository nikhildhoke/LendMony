document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function() {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(function (accounts) {
                    const account = accounts[0];
                    window.location.href = '/dashboard';
                })
                .catch(function (error) {
                    console.error('There was an error!', error);
                });
        } else {
            alert('Please install MetaMask!');
        }
    });
});
