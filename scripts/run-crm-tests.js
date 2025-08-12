/**
 * CRM Test Runner
 * This script runs all CRM workflow tests and generates a comprehensive report.
 */

import { 
  testContactCreation, 
  testContactUpdate, 
  testContactDeletion,
  testCompanyCreation,
  testCompanyUpdate,
  testCompanyDeletion,
  testDealCreation,
  testDealUpdate,
  testDealDeletion,
  testTicketCreation,
  testTicketUpdate,
  testTicketDeletion,
  generateTestReport,
  printTestReport 
} from './crm-verification-tests.js';

// Mock Redux store for testing
class MockStore {
  constructor(initialState = {}) {
    this.state = {
      contacts: { contacts: [] },
      companies: { companies: [] },
      deals: { deals: [] },
      tickets: { tickets: [] },
      ...initialState
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    switch (action.type) {
      case 'contacts/addContact':
        const newContact = {
          ...action.payload,
          id: Date.now().toString(),
          createDate: new Date().toLocaleDateString(),
          lastActivityDate: "Just now"
        };
        this.state.contacts.contacts.unshift(newContact);
        break;

      case 'contacts/updateContact':
        const contactIndex = this.state.contacts.contacts.findIndex(c => c.id === action.payload.id);
        if (contactIndex !== -1) {
          this.state.contacts.contacts[contactIndex] = action.payload;
        }
        break;

      case 'contacts/deleteContact':
        this.state.contacts.contacts = this.state.contacts.contacts.filter(c => c.id !== action.payload);
        break;

      case 'companies/addCompany':
        const newCompany = {
          ...action.payload,
          id: Date.now().toString(),
          createDate: new Date().toLocaleDateString(),
          lastActivityDate: "Just now"
        };
        this.state.companies.companies.unshift(newCompany);
        break;

      case 'companies/updateCompany':
        const companyIndex = this.state.companies.companies.findIndex(c => c.id === action.payload.id);
        if (companyIndex !== -1) {
          this.state.companies.companies[companyIndex] = action.payload;
        }
        break;

      case 'companies/deleteCompany':
        this.state.companies.companies = this.state.companies.companies.filter(c => c.id !== action.payload);
        break;

      case 'deals/addDeal':
        const newDeal = {
          ...action.payload,
          id: Date.now().toString(),
          createDate: new Date().toLocaleDateString(),
          lastActivityDate: "Just now"
        };
        this.state.deals.deals.unshift(newDeal);
        break;

      case 'deals/updateDeal':
        const dealIndex = this.state.deals.deals.findIndex(d => d.id === action.payload.id);
        if (dealIndex !== -1) {
          this.state.deals.deals[dealIndex] = action.payload;
        }
        break;

      case 'deals/deleteDeal':
        this.state.deals.deals = this.state.deals.deals.filter(d => d.id !== action.payload);
        break;

      case 'tickets/addTicket':
        const newTicket = {
          ...action.payload,
          id: Date.now().toString(),
          createDate: new Date().toLocaleDateString(),
          lastActivityDate: "Just now"
        };
        this.state.tickets.tickets.unshift(newTicket);
        break;

      case 'tickets/updateTicket':
        const ticketIndex = this.state.tickets.tickets.findIndex(t => t.id === action.payload.id);
        if (ticketIndex !== -1) {
          this.state.tickets.tickets[ticketIndex] = action.payload;
        }
        break;

      case 'tickets/deleteTicket':
        this.state.tickets.tickets = this.state.tickets.tickets.filter(t => t.id !== action.payload);
        break;

      default:
        console.warn(`Unknown action type: ${action.type}`);
    }

    this.listeners.forEach(listener => listener());
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// Test data
const testData = {
  contact: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    leadStatus: "New",
    favoriteContent: "Blog Posts",
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Developer",
    lifecycleStage: "Lead",
    contactOwner: "Anil Kumar Pandiya"
  },
  company: {
    name: "Test Company Inc",
    domain: "testcompany.com",
    owner: "Anil Kumar Pandiya",
    phone: "+1234567890",
    industry: "Technology",
    city: "San Francisco",
    state: "California",
    country: "United States",
    employees: 100,
    annualRevenue: 5000000,
    description: "Test company description"
  },
  deal: {
    name: "Test Deal",
    amount: "$50,000",
    stage: "Appointment Scheduled",
    pipeline: "Sales Pipeline",
    closeDate: "2025-12-31",
    owner: "Anil Kumar Pandiya",
    dealType: "New Business",
    priority: "Medium",
    recordSource: "CRM UI"
  },
  ticket: {
    name: "Test Support Ticket",
    description: "Customer needs assistance",
    pipeline: "Support Pipeline",
    status: "New (Support Pipeline)",
    source: "Email",
    owner: "Anil Kumar Pandiya",
    priority: "Medium",
    associatedContact: "John Doe",
    associatedCompany: "Test Company Inc"
  }
};

// Initialize store
const store = new MockStore();

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting CRM Workflow Tests...\n');

  const results = [];

  // Contact Tests
  console.log('📞 Testing Contact Workflows...');
  results.push(testContactCreation(store, testData.contact));
  
  // Get the created contact ID for update/delete tests
  const createdContact = store.getState().contacts.contacts[0];
  if (createdContact) {
    results.push(testContactUpdate(store, createdContact.id, { name: "Updated John Doe" }));
    results.push(testContactDeletion(store, createdContact.id));
  }

  // Company Tests
  console.log('🏢 Testing Company Workflows...');
  results.push(testCompanyCreation(store, testData.company));
  
  const createdCompany = store.getState().companies.companies[0];
  if (createdCompany) {
    results.push(testCompanyUpdate(store, createdCompany.id, { name: "Updated Test Company Inc" }));
    results.push(testCompanyDeletion(store, createdCompany.id));
  }

  // Deal Tests
  console.log('💰 Testing Deal Workflows...');
  results.push(testDealCreation(store, testData.deal));
  
  const createdDeal = store.getState().deals.deals[0];
  if (createdDeal) {
    results.push(testDealUpdate(store, createdDeal.id, { name: "Updated Test Deal" }));
    results.push(testDealDeletion(store, createdDeal.id));
  }

  // Ticket Tests
  console.log('🎫 Testing Ticket Workflows...');
  results.push(testTicketCreation(store, testData.ticket));
  
  const createdTicket = store.getState().tickets.tickets[0];
  if (createdTicket) {
    results.push(testTicketUpdate(store, createdTicket.id, { name: "Updated Test Support Ticket" }));
    results.push(testTicketDeletion(store, createdTicket.id));
  }

  // Generate and print report
  const report = generateTestReport(results);
  printTestReport(report);

  // Save report to file
  const fs = await import('fs');
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: report.totalTests,
      passedTests: report.passedTests,
      failedTests: report.failedTests,
      successRate: report.successRate
    },
    details: report.details
  };

  fs.writeFileSync(
    './crm-test-report.json', 
    JSON.stringify(reportData, null, 2)
  );

  console.log('\n📄 Test report saved to: crm-test-report.json');

  return report;
}

// Export functions for use in other modules
export { runAllTests, MockStore, testData };

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
} 