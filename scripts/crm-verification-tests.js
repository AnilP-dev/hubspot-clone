/**
 * CRM Workflow Verification Scripts
 * These scripts can be used to verify the Redux state and UI behavior
 * for all CRM workflows in the HubSpot clone application.
 */

// ============================================================================
// REDUX STATE VERIFICATION FUNCTIONS
// ============================================================================

/**
 * Verify Contact State After Creation/Update
 * @param {Object} state - Redux state
 * @param {Object} expectedContact - Expected contact data
 * @returns {Object} Verification result
 */
export const verifyContactState = (state, expectedContact) => {
  const result = {
    success: true,
    errors: [],
    details: {}
  };

  try {
    const contact = state.contacts.contacts.find(c => c.email === expectedContact.email);
    
    if (!contact) {
      result.success = false;
      result.errors.push(`Contact with email ${expectedContact.email} not found`);
      return result;
    }

    // Verify required fields
    const requiredFields = ['name', 'email', 'phone', 'leadStatus', 'favoriteContent'];
    requiredFields.forEach(field => {
      if (contact[field] !== expectedContact[field]) {
        result.success = false;
        result.errors.push(`Field ${field}: expected ${expectedContact[field]}, got ${contact[field]}`);
      }
    });

    // Verify lastActivityDate is updated
    if (contact.lastActivityDate !== "Just now") {
      result.success = false;
      result.errors.push(`lastActivityDate should be "Just now", got ${contact.lastActivityDate}`);
    }

    // Verify ID exists
    if (!contact.id) {
      result.success = false;
      result.errors.push("Contact ID is missing");
    }

    result.details = {
      contactId: contact.id,
      contactName: contact.name,
      lastActivityDate: contact.lastActivityDate
    };

  } catch (error) {
    result.success = false;
    result.errors.push(`Verification failed: ${error.message}`);
  }

  return result;
};

/**
 * Verify Company State After Creation/Update
 * @param {Object} state - Redux state
 * @param {Object} expectedCompany - Expected company data
 * @returns {Object} Verification result
 */
export const verifyCompanyState = (state, expectedCompany) => {
  const result = {
    success: true,
    errors: [],
    details: {}
  };

  try {
    const company = state.companies.companies.find(c => c.name === expectedCompany.name);
    
    if (!company) {
      result.success = false;
      result.errors.push(`Company with name ${expectedCompany.name} not found`);
      return result;
    }

    // Verify required fields
    const requiredFields = ['name', 'domain', 'owner', 'phone', 'industry'];
    requiredFields.forEach(field => {
      if (company[field] !== expectedCompany[field]) {
        result.success = false;
        result.errors.push(`Field ${field}: expected ${expectedCompany[field]}, got ${company[field]}`);
      }
    });

    // Verify lastActivityDate is updated
    if (company.lastActivityDate !== "Just now") {
      result.success = false;
      result.errors.push(`lastActivityDate should be "Just now", got ${company.lastActivityDate}`);
    }

    result.details = {
      companyId: company.id,
      companyName: company.name,
      lastActivityDate: company.lastActivityDate
    };

  } catch (error) {
    result.success = false;
    result.errors.push(`Verification failed: ${error.message}`);
  }

  return result;
};

/**
 * Verify Deal State After Creation/Update
 * @param {Object} state - Redux state
 * @param {Object} expectedDeal - Expected deal data
 * @returns {Object} Verification result
 */
export const verifyDealState = (state, expectedDeal) => {
  const result = {
    success: true,
    errors: [],
    details: {}
  };

  try {
    const deal = state.deals.deals.find(d => d.name === expectedDeal.name);
    
    if (!deal) {
      result.success = false;
      result.errors.push(`Deal with name ${expectedDeal.name} not found`);
      return result;
    }

    // Verify required fields
    const requiredFields = ['name', 'amount', 'stage', 'pipeline', 'owner'];
    requiredFields.forEach(field => {
      if (deal[field] !== expectedDeal[field]) {
        result.success = false;
        result.errors.push(`Field ${field}: expected ${expectedDeal[field]}, got ${deal[field]}`);
      }
    });

    // Verify lastActivityDate is updated
    if (deal.lastActivityDate !== "Just now") {
      result.success = false;
      result.errors.push(`lastActivityDate should be "Just now", got ${deal.lastActivityDate}`);
    }

    result.details = {
      dealId: deal.id,
      dealName: deal.name,
      lastActivityDate: deal.lastActivityDate
    };

  } catch (error) {
    result.success = false;
    result.errors.push(`Verification failed: ${error.message}`);
  }

  return result;
};

/**
 * Verify Ticket State After Creation/Update
 * @param {Object} state - Redux state
 * @param {Object} expectedTicket - Expected ticket data
 * @returns {Object} Verification result
 */
export const verifyTicketState = (state, expectedTicket) => {
  const result = {
    success: true,
    errors: [],
    details: {}
  };

  try {
    const ticket = state.tickets.tickets.find(t => t.name === expectedTicket.name);
    
    if (!ticket) {
      result.success = false;
      result.errors.push(`Ticket with name ${expectedTicket.name} not found`);
      return result;
    }

    // Verify required fields
    const requiredFields = ['name', 'description', 'pipeline', 'status', 'owner', 'priority'];
    requiredFields.forEach(field => {
      if (ticket[field] !== expectedTicket[field]) {
        result.success = false;
        result.errors.push(`Field ${field}: expected ${expectedTicket[field]}, got ${ticket[field]}`);
      }
    });

    // Verify lastActivityDate is updated
    if (ticket.lastActivityDate !== "Just now") {
      result.success = false;
      result.errors.push(`lastActivityDate should be "Just now", got ${ticket.lastActivityDate}`);
    }

    result.details = {
      ticketId: ticket.id,
      ticketName: ticket.name,
      lastActivityDate: ticket.lastActivityDate
    };

  } catch (error) {
    result.success = false;
    result.errors.push(`Verification failed: ${error.message}`);
  }

  return result;
};

// ============================================================================
// UI STATE VERIFICATION FUNCTIONS
// ============================================================================

/**
 * Verify Modal State
 * @param {boolean} modalOpen - Current modal state
 * @param {boolean} expectedOpen - Expected modal state
 * @returns {Object} Verification result
 */
export const verifyModalState = (modalOpen, expectedOpen) => {
  const result = {
    success: true,
    errors: [],
    details: {}
  };

  if (modalOpen !== expectedOpen) {
    result.success = false;
    result.errors.push(`Modal state: expected ${expectedOpen}, got ${modalOpen}`);
  }

  result.details = {
    currentState: modalOpen,
    expectedState: expectedOpen
  };

  return result;
};

/**
 * Verify Toast Message
 * @param {string} message - Current toast message
 * @param {string} expectedMessage - Expected toast message
 * @returns {Object} Verification result
 */
export const verifyToastMessage = (message, expectedMessage) => {
  const result = {
    success: true,
    errors: [],
    details: {}
  };

  if (!message.includes(expectedMessage)) {
    result.success = false;
    result.errors.push(`Toast message: expected to contain "${expectedMessage}", got "${message}"`);
  }

  result.details = {
    currentMessage: message,
    expectedMessage: expectedMessage
  };

  return result;
};

/**
 * Verify List Count
 * @param {number} currentCount - Current list count
 * @param {number} expectedCount - Expected list count
 * @returns {Object} Verification result
 */
export const verifyListCount = (currentCount, expectedCount) => {
  const result = {
    success: true,
    errors: [],
    details: {}
  };

  if (currentCount !== expectedCount) {
    result.success = false;
    result.errors.push(`List count: expected ${expectedCount}, got ${currentCount}`);
  }

  result.details = {
    currentCount: currentCount,
    expectedCount: expectedCount
  };

  return result;
};

// ============================================================================
// WORKFLOW TEST FUNCTIONS
// ============================================================================

/**
 * Test Contact Creation Workflow
 * @param {Object} store - Redux store
 * @param {Object} contactData - Contact data to create
 * @returns {Object} Test result
 */
export const testContactCreation = (store, contactData) => {
  const result = {
    workflowId: 'CRM-CONTACT-001',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCount = initialState.contacts.contacts.length;
    result.steps.push(`Initial contact count: ${initialCount}`);

    // Step 2: Dispatch create action
    store.dispatch({
      type: 'contacts/addContact',
      payload: contactData
    });

    // Step 3: Verify state after creation
    const newState = store.getState();
    const newCount = newState.contacts.contacts.length;
    result.steps.push(`New contact count: ${newCount}`);

    // Step 4: Verify contact was added
    const verification = verifyContactState(newState, contactData);
    if (!verification.success) {
      result.success = false;
      result.errors.push(...verification.errors);
    }

    // Step 5: Verify count increased
    const countVerification = verifyListCount(newCount, initialCount + 1);
    if (!countVerification.success) {
      result.success = false;
      result.errors.push(...countVerification.errors);
    }

    result.steps.push('Contact creation workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Contact Update Workflow
 * @param {Object} store - Redux store
 * @param {string} contactId - Contact ID to update
 * @param {Object} updateData - Data to update
 * @returns {Object} Test result
 */
export const testContactUpdate = (store, contactId, updateData) => {
  const result = {
    workflowId: 'CRM-CONTACT-002',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialContact = initialState.contacts.contacts.find(c => c.id === contactId);
    if (!initialContact) {
      result.success = false;
      result.errors.push(`Contact with ID ${contactId} not found`);
      return result;
    }
    result.steps.push(`Found contact: ${initialContact.name}`);

    // Step 2: Dispatch update action
    const updatedContact = { ...initialContact, ...updateData, lastActivityDate: "Just now" };
    store.dispatch({
      type: 'contacts/updateContact',
      payload: updatedContact
    });

    // Step 3: Verify state after update
    const newState = store.getState();
    const verification = verifyContactState(newState, updatedContact);
    if (!verification.success) {
      result.success = false;
      result.errors.push(...verification.errors);
    }

    result.steps.push('Contact update workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Contact Deletion Workflow
 * @param {Object} store - Redux store
 * @param {string} contactId - Contact ID to delete
 * @returns {Object} Test result
 */
export const testContactDeletion = (store, contactId) => {
  const result = {
    workflowId: 'CRM-CONTACT-003',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCount = initialState.contacts.contacts.length;
    const initialContact = initialState.contacts.contacts.find(c => c.id === contactId);
    if (!initialContact) {
      result.success = false;
      result.errors.push(`Contact with ID ${contactId} not found`);
      return result;
    }
    result.steps.push(`Found contact to delete: ${initialContact.name}`);

    // Step 2: Dispatch delete action
    store.dispatch({
      type: 'contacts/deleteContact',
      payload: contactId
    });

    // Step 3: Verify state after deletion
    const newState = store.getState();
    const newCount = newState.contacts.contacts.length;
    const deletedContact = newState.contacts.contacts.find(c => c.id === contactId);

    if (deletedContact) {
      result.success = false;
      result.errors.push(`Contact with ID ${contactId} still exists after deletion`);
    }

    // Step 4: Verify count decreased
    const countVerification = verifyListCount(newCount, initialCount - 1);
    if (!countVerification.success) {
      result.success = false;
      result.errors.push(...countVerification.errors);
    }

    result.steps.push('Contact deletion workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Company Creation Workflow
 * @param {Object} store - Redux store
 * @param {Object} companyData - Company data to create
 * @returns {Object} Test result
 */
export const testCompanyCreation = (store, companyData) => {
  const result = {
    workflowId: 'CRM-COMPANY-001',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCount = initialState.companies.companies.length;
    result.steps.push(`Initial company count: ${initialCount}`);

    // Step 2: Dispatch create action
    store.dispatch({
      type: 'companies/addCompany',
      payload: companyData
    });

    // Step 3: Verify state after creation
    const newState = store.getState();
    const newCount = newState.companies.companies.length;
    result.steps.push(`New company count: ${newCount}`);

    // Step 4: Verify company was added
    const verification = verifyCompanyState(newState, companyData);
    if (!verification.success) {
      result.success = false;
      result.errors.push(...verification.errors);
    }

    // Step 5: Verify count increased
    const countVerification = verifyListCount(newCount, initialCount + 1);
    if (!countVerification.success) {
      result.success = false;
      result.errors.push(...countVerification.errors);
    }

    result.steps.push('Company creation workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Company Update Workflow
 * @param {Object} store - Redux store
 * @param {string} companyId - Company ID to update
 * @param {Object} updateData - Data to update
 * @returns {Object} Test result
 */
export const testCompanyUpdate = (store, companyId, updateData) => {
  const result = {
    workflowId: 'CRM-COMPANY-002',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCompany = initialState.companies.companies.find(c => c.id === companyId);
    if (!initialCompany) {
      result.success = false;
      result.errors.push(`Company with ID ${companyId} not found`);
      return result;
    }
    result.steps.push(`Found company: ${initialCompany.name}`);

    // Step 2: Dispatch update action
    const updatedCompany = { ...initialCompany, ...updateData, lastActivityDate: "Just now" };
    store.dispatch({
      type: 'companies/updateCompany',
      payload: updatedCompany
    });

    // Step 3: Verify state after update
    const newState = store.getState();
    const verification = verifyCompanyState(newState, updatedCompany);
    if (!verification.success) {
      result.success = false;
      result.errors.push(...verification.errors);
    }

    result.steps.push('Company update workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Company Deletion Workflow
 * @param {Object} store - Redux store
 * @param {string} companyId - Company ID to delete
 * @returns {Object} Test result
 */
export const testCompanyDeletion = (store, companyId) => {
  const result = {
    workflowId: 'CRM-COMPANY-003',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCount = initialState.companies.companies.length;
    const initialCompany = initialState.companies.companies.find(c => c.id === companyId);
    if (!initialCompany) {
      result.success = false;
      result.errors.push(`Company with ID ${companyId} not found`);
      return result;
    }
    result.steps.push(`Found company to delete: ${initialCompany.name}`);

    // Step 2: Dispatch delete action
    store.dispatch({
      type: 'companies/deleteCompany',
      payload: companyId
    });

    // Step 3: Verify state after deletion
    const newState = store.getState();
    const newCount = newState.companies.companies.length;
    const deletedCompany = newState.companies.companies.find(c => c.id === companyId);

    if (deletedCompany) {
      result.success = false;
      result.errors.push(`Company with ID ${companyId} still exists after deletion`);
    }

    // Step 4: Verify count decreased
    const countVerification = verifyListCount(newCount, initialCount - 1);
    if (!countVerification.success) {
      result.success = false;
      result.errors.push(...countVerification.errors);
    }

    result.steps.push('Company deletion workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Deal Creation Workflow
 * @param {Object} store - Redux store
 * @param {Object} dealData - Deal data to create
 * @returns {Object} Test result
 */
export const testDealCreation = (store, dealData) => {
  const result = {
    workflowId: 'CRM-DEAL-001',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCount = initialState.deals.deals.length;
    result.steps.push(`Initial deal count: ${initialCount}`);

    // Step 2: Dispatch create action
    store.dispatch({
      type: 'deals/addDeal',
      payload: dealData
    });

    // Step 3: Verify state after creation
    const newState = store.getState();
    const newCount = newState.deals.deals.length;
    result.steps.push(`New deal count: ${newCount}`);

    // Step 4: Verify deal was added
    const verification = verifyDealState(newState, dealData);
    if (!verification.success) {
      result.success = false;
      result.errors.push(...verification.errors);
    }

    // Step 5: Verify count increased
    const countVerification = verifyListCount(newCount, initialCount + 1);
    if (!countVerification.success) {
      result.success = false;
      result.errors.push(...countVerification.errors);
    }

    result.steps.push('Deal creation workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Deal Update Workflow
 * @param {Object} store - Redux store
 * @param {string} dealId - Deal ID to update
 * @param {Object} updateData - Data to update
 * @returns {Object} Test result
 */
export const testDealUpdate = (store, dealId, updateData) => {
  const result = {
    workflowId: 'CRM-DEAL-002',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialDeal = initialState.deals.deals.find(d => d.id === dealId);
    if (!initialDeal) {
      result.success = false;
      result.errors.push(`Deal with ID ${dealId} not found`);
      return result;
    }
    result.steps.push(`Found deal: ${initialDeal.name}`);

    // Step 2: Dispatch update action
    const updatedDeal = { ...initialDeal, ...updateData, lastActivityDate: "Just now" };
    store.dispatch({
      type: 'deals/updateDeal',
      payload: updatedDeal
    });

    // Step 3: Verify state after update
    const newState = store.getState();
    const verification = verifyDealState(newState, updatedDeal);
    if (!verification.success) {
      result.success = false;
      result.errors.push(...verification.errors);
    }

    result.steps.push('Deal update workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Deal Deletion Workflow
 * @param {Object} store - Redux store
 * @param {string} dealId - Deal ID to delete
 * @returns {Object} Test result
 */
export const testDealDeletion = (store, dealId) => {
  const result = {
    workflowId: 'CRM-DEAL-003',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCount = initialState.deals.deals.length;
    const initialDeal = initialState.deals.deals.find(d => d.id === dealId);
    if (!initialDeal) {
      result.success = false;
      result.errors.push(`Deal with ID ${dealId} not found`);
      return result;
    }
    result.steps.push(`Found deal to delete: ${initialDeal.name}`);

    // Step 2: Dispatch delete action
    store.dispatch({
      type: 'deals/deleteDeal',
      payload: dealId
    });

    // Step 3: Verify state after deletion
    const newState = store.getState();
    const newCount = newState.deals.deals.length;
    const deletedDeal = newState.deals.deals.find(d => d.id === dealId);

    if (deletedDeal) {
      result.success = false;
      result.errors.push(`Deal with ID ${dealId} still exists after deletion`);
    }

    // Step 4: Verify count decreased
    const countVerification = verifyListCount(newCount, initialCount - 1);
    if (!countVerification.success) {
      result.success = false;
      result.errors.push(...countVerification.errors);
    }

    result.steps.push('Deal deletion workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Ticket Creation Workflow
 * @param {Object} store - Redux store
 * @param {Object} ticketData - Ticket data to create
 * @returns {Object} Test result
 */
export const testTicketCreation = (store, ticketData) => {
  const result = {
    workflowId: 'CRM-TICKET-001',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCount = initialState.tickets.tickets.length;
    result.steps.push(`Initial ticket count: ${initialCount}`);

    // Step 2: Dispatch create action
    store.dispatch({
      type: 'tickets/addTicket',
      payload: ticketData
    });

    // Step 3: Verify state after creation
    const newState = store.getState();
    const newCount = newState.tickets.tickets.length;
    result.steps.push(`New ticket count: ${newCount}`);

    // Step 4: Verify ticket was added
    const verification = verifyTicketState(newState, ticketData);
    if (!verification.success) {
      result.success = false;
      result.errors.push(...verification.errors);
    }

    // Step 5: Verify count increased
    const countVerification = verifyListCount(newCount, initialCount + 1);
    if (!countVerification.success) {
      result.success = false;
      result.errors.push(...countVerification.errors);
    }

    result.steps.push('Ticket creation workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Ticket Update Workflow
 * @param {Object} store - Redux store
 * @param {string} ticketId - Ticket ID to update
 * @param {Object} updateData - Data to update
 * @returns {Object} Test result
 */
export const testTicketUpdate = (store, ticketId, updateData) => {
  const result = {
    workflowId: 'CRM-TICKET-002',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialTicket = initialState.tickets.tickets.find(t => t.id === ticketId);
    if (!initialTicket) {
      result.success = false;
      result.errors.push(`Ticket with ID ${ticketId} not found`);
      return result;
    }
    result.steps.push(`Found ticket: ${initialTicket.name}`);

    // Step 2: Dispatch update action
    const updatedTicket = { ...initialTicket, ...updateData, lastActivityDate: "Just now" };
    store.dispatch({
      type: 'tickets/updateTicket',
      payload: updatedTicket
    });

    // Step 3: Verify state after update
    const newState = store.getState();
    const verification = verifyTicketState(newState, updatedTicket);
    if (!verification.success) {
      result.success = false;
      result.errors.push(...verification.errors);
    }

    result.steps.push('Ticket update workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

/**
 * Test Ticket Deletion Workflow
 * @param {Object} store - Redux store
 * @param {string} ticketId - Ticket ID to delete
 * @returns {Object} Test result
 */
export const testTicketDeletion = (store, ticketId) => {
  const result = {
    workflowId: 'CRM-TICKET-003',
    success: true,
    errors: [],
    steps: []
  };

  try {
    // Step 1: Get initial state
    const initialState = store.getState();
    const initialCount = initialState.tickets.tickets.length;
    const initialTicket = initialState.tickets.tickets.find(t => t.id === ticketId);
    if (!initialTicket) {
      result.success = false;
      result.errors.push(`Ticket with ID ${ticketId} not found`);
      return result;
    }
    result.steps.push(`Found ticket to delete: ${initialTicket.name}`);

    // Step 2: Dispatch delete action
    store.dispatch({
      type: 'tickets/deleteTicket',
      payload: ticketId
    });

    // Step 3: Verify state after deletion
    const newState = store.getState();
    const newCount = newState.tickets.tickets.length;
    const deletedTicket = newState.tickets.tickets.find(t => t.id === ticketId);

    if (deletedTicket) {
      result.success = false;
      result.errors.push(`Ticket with ID ${ticketId} still exists after deletion`);
    }

    // Step 4: Verify count decreased
    const countVerification = verifyListCount(newCount, initialCount - 1);
    if (!countVerification.success) {
      result.success = false;
      result.errors.push(...countVerification.errors);
    }

    result.steps.push('Ticket deletion workflow completed successfully');

  } catch (error) {
    result.success = false;
    result.errors.push(`Workflow failed: ${error.message}`);
  }

  return result;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate Test Report
 * @param {Array} testResults - Array of test results
 * @returns {Object} Test report
 */
export const generateTestReport = (testResults) => {
  const report = {
    totalTests: testResults.length,
    passedTests: 0,
    failedTests: 0,
    successRate: 0,
    details: []
  };

  testResults.forEach(result => {
    if (result.success) {
      report.passedTests++;
    } else {
      report.failedTests++;
    }

    report.details.push({
      workflowId: result.workflowId,
      success: result.success,
      errors: result.errors,
      steps: result.steps
    });
  });

  report.successRate = (report.passedTests / report.totalTests) * 100;

  return report;
};

/**
 * Print Test Report
 * @param {Object} report - Test report
 */
export const printTestReport = (report) => {
  console.log('='.repeat(60));
  console.log('CRM WORKFLOW TEST REPORT');
  console.log('='.repeat(60));
  console.log(`Total Tests: ${report.totalTests}`);
  console.log(`Passed: ${report.passedTests}`);
  console.log(`Failed: ${report.failedTests}`);
  console.log(`Success Rate: ${report.successRate.toFixed(2)}%`);
  console.log('='.repeat(60));

  report.details.forEach(detail => {
    console.log(`\n${detail.workflowId}: ${detail.success ? '✅ PASSED' : '❌ FAILED'}`);
    if (detail.errors.length > 0) {
      console.log('Errors:');
      detail.errors.forEach(error => console.log(`  - ${error}`));
    }
    if (detail.steps.length > 0) {
      console.log('Steps:');
      detail.steps.forEach(step => console.log(`  - ${step}`));
    }
  });

  console.log('\n' + '='.repeat(60));
};

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/*
Example usage in a test file:

import { 
  testContactCreation, 
  testContactUpdate, 
  testContactDeletion,
  generateTestReport,
  printTestReport 
} from './crm-verification-tests.js';

// Test data
const testContact = {
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
};

// Run tests
const results = [
  testContactCreation(store, testContact),
  testContactUpdate(store, "contact-id", { name: "Updated Name" }),
  testContactDeletion(store, "contact-id")
];

// Generate and print report
const report = generateTestReport(results);
printTestReport(report);
*/ 