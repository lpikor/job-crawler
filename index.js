class Company {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}

class UI {
    static displayCompanies() {
        // Fake database
        const StoredCompanies = [
            {
               "url":"https://www.10clouds.com",
               "name":"10Clouds"
            },
            {
               "url":"https://2cW.pl",
               "name":"2cW"
            },
            {
               "url":"https://www.2n.pl/",
               "name":"2N"
            },
            {
               "url":"https://3step.pl/",
               "name":"3Step"
            }
        ];

        const companies = StoredCompanies;

        companies.forEach(company => {
            UI.addCompanyToList(company);
        });
    }

    static addCompanyToList(company) {
        const list = document.querySelector('.companies-list');

        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <li><a href="${company.url}">${company.name}</a></li>
        `;

        list.appendChild(listItem);
    }
}

// Display Companies
document.addEventListener('DOMContentLoaded', UI.displayCompanies);

// Add a Company
document.querySelector('.add-company').addEventListener('submit', (e) => {
    // Prevent submit
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#company-name').value;
    const url = document.querySelector('#company-url').value;

    // Instantiate Company
    const company = new Company(name, url);
    console.log(company);
    UI.addCompanyToList(company);
});