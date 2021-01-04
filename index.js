class Company {
    constructor(name, url, id) {
        this.name = name;
        this.url = this.fixUrl(url);
        this.id = id;
        this.jobsUrl = this.getJobsUrl(this.url);
    }

    fixUrl(url) {
        if (!url.includes('http')) {
            url = 'http://' + url;
        }
        if (url.charAt(url.length-1) !== "/") {
            url += '/';
        }
        return url;
    }

    getJobsUrl(url) {
        const jobsKeywords = [
            'career',
            'careers',
            'job',
            'jobs',
            'join-us',
            'kariera',
            'oferty-pracy',
            'praca'
        ];
        let jobsUrl = '';
        jobsKeywords.every(keyword => {
            if (Request.urlExists(url + keyword)) {
                jobsUrl = url + keyword;
                return false;
            }
            jobsUrl = 'Not found';
            return true;
        });
        return jobsUrl;
    }
}

class UI {
    static displayCompanies() {
        const companies = Store.getCompanies();

        companies.forEach(company => {
            UI.addCompanyToList(company);
        });
    }

    static addCompanyToList(company) {
        const list = document.querySelector('.companies-list');

        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <a href="${company.url}" target="_blank">${company.name}</a>
            <span style="display:none;">${company.id}</span>
            <button class="remove-company">Remove</button>
        `;

        if (company.jobsUrl !== 'Not found') {
            listItem.innerHTML += `<a href="${company.jobsUrl}" target="_blank">Job offers</a>`;
        }

        list.appendChild(listItem);
    }

    static removeCompany(element) {
        element.parentElement.remove();
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

    static removeCompany(id) {
        const companies = Store.getCompanies();

        companies.forEach((company, index) => {
            if (company.id === id) {
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
        try {
            request.send(null);
        } catch {
            console.log('Error connecting to ' + target);
        }
        return request;
    }

    static urlExists(target) {
        let request = this.sendRequest(target);
        if (request.status == 200) {
            return true;
        }
        return false;
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
    const ID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Instantiate Company
    const company = new Company(name, url, ID());
    console.log(company);

    // Add Company to UI
    UI.addCompanyToList(company);

    // Add Company to Store
    Store.addCompany(company);

    // Clear fields
    UI.clearFields();
});

// Remove a Company
document.querySelector('.companies-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-company')) {
        // Remove Company from Store
        Store.removeCompany(e.target.previousElementSibling.textContent);
    
        // Remove Company from UI
        UI.removeCompany(e.target);
    }
})