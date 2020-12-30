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
            <a href="${company.url}">${company.name}</a> <button class="remove-company">Remove</button>
        `;

        list.appendChild(listItem);
    }

    static deleteCompany(element) {
        if (element.classList.contains('remove-company')) {
            element.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#company-name').value = '';
        document.querySelector('#company-url').value = '';
    }
}

class Store {
    static getCompanies() {
        let companies;
        
        if (localStorage.getItem('companies') === null) {
            companies = [];
        } else {
            companies = JSON.parse(localStorage.getItem('companies'));
        }

        return companies;
    }

    static addCompany(company) {
        const companies = Store.getCompanies();

        companies.push(company);

        localStorage.setItem('companies', JSON.stringify(companies));
    }

    static removeCompany(name) {
        const companies = Store.getCompanies();

        companies.forEach((company, index) => {
            if (company.name === name) {
                companies.splice(index, 1);
            }
        });

        localStorage.setItem('companies', JSON.stringify(companies));
    }
}

class Request {
    static sendRequest(target) {
        let request = new XMLHttpRequest();
        request.open('GET', target, false);
        request.send(null);
        return request;
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

    // Clear fields
    UI.clearFields();
});

// Remove a Company
document.querySelector('.companies-list').addEventListener('click', (e) => {
    UI.deleteCompany(e.target);
})