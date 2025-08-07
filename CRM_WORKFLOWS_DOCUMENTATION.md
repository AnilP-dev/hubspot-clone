# HubSpot Clone CRM Workflows Documentation

## Overview
This document outlines all user workflows available in the CRM system, including step-by-step instructions and verification scripts to ensure proper functionality.

---

## 1. CONTACTS MANAGEMENT WORKFLOWS

### 1.1 Create New Contact
**Workflow ID**: CRM-CONTACT-001

#### Steps:
1. Navigate to CRM → Contacts
2. Click "Create contact" button
3. Fill in required fields:
   - Email (required)
   - First name
   - Last name
   - Contact owner
   - Job title
   - Phone number
   - Lifecycle stage
4. Click "Create" button
5. Verify contact appears in the list

#### Verification Script:
```javascript
// Expected Redux State After Creation
const expectedState = {
  contacts: {
    contacts: [
      {
        id: expect.any(String),
        name: "John Doe", // or email if name not provided
        email: "john@example.com",
        phone: "+1234567890",
        leadStatus: "New",
        favoriteContent: "Blog Posts",
        avatar: "/placeholder-user.jpg",
        firstName: "John",
        lastName: "Doe",
        jobTitle: "Developer",
        lifecycleStage: "Lead",
        contactOwner: "Anil Kumar Pandiya",
        createDate: expect.any(String),
        lastActivityDate: "Just now"
      },
      // ... existing contacts
    ]
  }
}
```

#### Expected Results:
- ✅ Contact appears at the top of the contacts list
- ✅ Contact count increases by 1
- ✅ Success toast message: "Contact created successfully!"
- ✅ Form resets after creation

---

### 1.2 Update Existing Contact
**Workflow ID**: CRM-CONTACT-002

#### Steps:
1. Navigate to CRM → Contacts
2. Click on any contact name or email
3. Update any fields in the modal:
   - Email
   - First name
   - Last name
   - Contact owner
   - Job title
   - Phone number
   - Lead status
   - Lifecycle stage
   - Favorite content
4. Click "Update" button
5. Verify changes are reflected

#### Verification Script:
```javascript
// Expected Redux State After Update
const expectedState = {
  contacts: {
    contacts: [
      {
        id: "existing-contact-id",
        name: "Updated Name",
        email: "updated@example.com",
        phone: "+1987654321",
        leadStatus: "Qualified",
        favoriteContent: "Webinars",
        firstName: "Updated",
        lastName: "Name",
        jobTitle: "Senior Developer",
        lifecycleStage: "Customer",
        contactOwner: "Sarah Wilson",
        lastActivityDate: "Just now"
      }
    ]
  }
}
```

#### Expected Results:
- ✅ Contact data is updated in the list
- ✅ Success toast message: "Contact updated successfully!"
- ✅ Modal closes after update
- ✅ Last activity date updates to "Just now"

---

### 1.3 Delete Single Contact
**Workflow ID**: CRM-CONTACT-003

#### Steps:
1. Navigate to CRM → Contacts
2. Find the contact to delete
3. Click the delete icon (trash) next to the contact
4. Confirm deletion if prompted
5. Verify contact is removed

#### Verification Script:
```javascript
// Expected Redux State After Deletion
const expectedState = {
  contacts: {
    contacts: [
      // Contact with specified ID should be removed
      // Array length should decrease by 1
    ]
  }
}
```

#### Expected Results:
- ✅ Contact disappears from the list
- ✅ Contact count decreases by 1
- ✅ Success toast message: "Contact deleted successfully!"

---

### 1.4 Bulk Delete Contacts
**Workflow ID**: CRM-CONTACT-004

#### Steps:
1. Navigate to CRM → Contacts
2. Select multiple contacts using checkboxes
3. Click "Delete" button in the floating action bar
4. Confirm bulk deletion
5. Verify all selected contacts are removed

#### Verification Script:
```javascript
// Expected Redux State After Bulk Deletion
const expectedState = {
  contacts: {
    contacts: [
      // All selected contact IDs should be removed
      // Array length should decrease by number of selected contacts
    ]
  }
}
```

#### Expected Results:
- ✅ All selected contacts disappear from the list
- ✅ Contact count decreases by number of deleted contacts
- ✅ Success toast message: "X contact(s) deleted successfully!"
- ✅ Floating action bar disappears

---

### 1.5 Export Contacts
**Workflow ID**: CRM-CONTACT-005

#### Steps:
1. Navigate to CRM → Contacts
2. Apply any filters if needed
3. Click "Export" button
4. Verify CSV file downloads

#### Expected Results:
- ✅ CSV file downloads with filename "contacts.csv"
- ✅ File contains all visible contacts
- ✅ Headers include: Name, Email, Phone, Job Title, Lead Status, Favorite Content, Contact Owner, Create Date, Last Activity Date
- ✅ Success toast message: "Exported X contacts successfully!"

---

## 2. COMPANIES MANAGEMENT WORKFLOWS

### 2.1 Create New Company
**Workflow ID**: CRM-COMPANY-001

#### Steps:
1. Navigate to CRM → Companies
2. Click "Create company" button
3. Fill in required fields:
   - Company name (required)
   - Domain
   - Company owner
   - Phone
   - Industry
   - City, State, Country
   - Number of employees
   - Annual revenue
   - Description
4. Click "Create" button
5. Verify company appears in the list

#### Verification Script:
```javascript
// Expected Redux State After Creation
const expectedState = {
  companies: {
    companies: [
      {
        id: expect.any(String),
        name: "New Company Inc",
        domain: "newcompany.com",
        owner: "Anil Kumar Pandiya",
        phone: "+1234567890",
        industry: "Technology",
        city: "San Francisco",
        state: "California",
        country: "United States",
        employees: 100,
        annualRevenue: 5000000,
        description: "Technology solutions provider",
        createDate: expect.any(String),
        lastActivityDate: "Just now"
      }
    ]
  }
}
```

#### Expected Results:
- ✅ Company appears at the top of the companies list
- ✅ Company count increases by 1
- ✅ Success toast message: "Company created successfully!"

---

### 2.2 Update Existing Company
**Workflow ID**: CRM-COMPANY-002

#### Steps:
1. Navigate to CRM → Companies
2. Click on any company name or domain
3. Update any fields in the modal
4. Click "Update" button
5. Verify changes are reflected

#### Verification Script:
```javascript
// Expected Redux State After Update
const expectedState = {
  companies: {
    companies: [
      {
        id: "existing-company-id",
        name: "Updated Company Name",
        domain: "updatedcompany.com",
        owner: "Sarah Wilson",
        phone: "+1987654321",
        industry: "Software",
        city: "New York",
        state: "New York",
        country: "United States",
        employees: 200,
        annualRevenue: 10000000,
        description: "Updated company description",
        lastActivityDate: "Just now"
      }
    ]
  }
}
```

#### Expected Results:
- ✅ Company data is updated in the list
- ✅ Success toast message: "Company updated successfully!"
- ✅ Modal closes after update

---

### 2.3 Delete Company
**Workflow ID**: CRM-COMPANY-003

#### Steps:
1. Navigate to CRM → Companies
2. Select company using checkbox
3. Click "Delete" button
4. Confirm deletion
5. Verify company is removed

#### Expected Results:
- ✅ Company disappears from the list
- ✅ Company count decreases by 1
- ✅ Success toast message: "Company deleted successfully!"

---

## 3. DEALS MANAGEMENT WORKFLOWS

### 3.1 Create New Deal
**Workflow ID**: CRM-DEAL-001

#### Steps:
1. Navigate to CRM → Deals
2. Click "Create deal" button
3. Fill in required fields:
   - Deal name (required)
   - Amount
   - Stage
   - Pipeline
   - Close date
   - Deal owner
   - Deal type
   - Priority
   - Record source
4. Click "Create" button
5. Verify deal appears in the list

#### Verification Script:
```javascript
// Expected Redux State After Creation
const expectedState = {
  deals: {
    deals: [
      {
        id: expect.any(String),
        name: "New Deal",
        amount: "$50,000",
        stage: "Appointment Scheduled",
        pipeline: "Sales Pipeline",
        closeDate: "2025-12-31",
        owner: "Anil Kumar Pandiya",
        dealType: "New Business",
        priority: "Medium",
        recordSource: "CRM UI",
        createDate: expect.any(String),
        lastActivityDate: "--"
      }
    ]
  }
}
```

#### Expected Results:
- ✅ Deal appears at the top of the deals list
- ✅ Deal count increases by 1
- ✅ Success toast message: "Deal created successfully!"

---

### 3.2 Update Existing Deal
**Workflow ID**: CRM-DEAL-002

#### Steps:
1. Navigate to CRM → Deals
2. Click on any deal name
3. Update any fields in the modal
4. Click "Update" button
5. Verify changes are reflected

#### Verification Script:
```javascript
// Expected Redux State After Update
const expectedState = {
  deals: {
    deals: [
      {
        id: "existing-deal-id",
        name: "Updated Deal Name",
        amount: "$75,000",
        stage: "Contract Sent",
        pipeline: "Sales Pipeline",
        closeDate: "2025-11-30",
        owner: "Mike Davis",
        dealType: "Existing Business",
        priority: "High",
        recordSource: "CRM UI",
        lastActivityDate: "Just now"
      }
    ]
  }
}
```

#### Expected Results:
- ✅ Deal data is updated in the list
- ✅ Success toast message: "Deal updated successfully!"
- ✅ Modal closes after update

---

### 3.3 Delete Deal
**Workflow ID**: CRM-DEAL-003

#### Steps:
1. Navigate to CRM → Deals
2. Select deal using checkbox
3. Click "Delete" button
4. Confirm deletion
5. Verify deal is removed

#### Expected Results:
- ✅ Deal disappears from the list
- ✅ Deal count decreases by 1
- ✅ Success toast message: "Deal deleted successfully!"

---

## 4. TICKETS MANAGEMENT WORKFLOWS

### 4.1 Create New Ticket
**Workflow ID**: CRM-TICKET-001

#### Steps:
1. Navigate to CRM → Tickets
2. Click "Create ticket" button
3. Fill in required fields:
   - Ticket name (required)
   - Description
   - Pipeline
   - Status
   - Source
   - Ticket owner
   - Priority
   - Associated contact
   - Associated company
4. Click "Create" button
5. Verify ticket appears in the list

#### Verification Script:
```javascript
// Expected Redux State After Creation
const expectedState = {
  tickets: {
    tickets: [
      {
        id: expect.any(String),
        name: "New Support Ticket",
        description: "Customer needs assistance",
        pipeline: "Support Pipeline",
        status: "New (Support Pipeline)",
        source: "Email",
        owner: "Anil Kumar Pandiya",
        priority: "Medium",
        associatedContact: "John Doe",
        associatedCompany: "ABC Corp",
        createDate: expect.any(String),
        lastActivityDate: expect.any(String)
      }
    ]
  }
}
```

#### Expected Results:
- ✅ Ticket appears at the top of the tickets list
- ✅ Ticket count increases by 1
- ✅ Success toast message: "Ticket created successfully!"

---

### 4.2 Update Existing Ticket
**Workflow ID**: CRM-TICKET-002

#### Steps:
1. Navigate to CRM → Tickets
2. Click on any ticket name
3. Update any fields in the modal
4. Click "Update" button
5. Verify changes are reflected

#### Verification Script:
```javascript
// Expected Redux State After Update
const expectedState = {
  tickets: {
    tickets: [
      {
        id: "existing-ticket-id",
        name: "Updated Ticket Name",
        description: "Updated ticket description",
        pipeline: "Support Pipeline",
        status: "In Progress (Support Pipeline)",
        source: "Phone",
        owner: "Sarah Wilson",
        priority: "High",
        associatedContact: "Jane Smith",
        associatedCompany: "XYZ Corp",
        lastActivityDate: "Just now"
      }
    ]
  }
}
```

#### Expected Results:
- ✅ Ticket data is updated in the list
- ✅ Success toast message: "Ticket updated successfully!"
- ✅ Modal closes after update

---

### 4.3 Delete Ticket
**Workflow ID**: CRM-TICKET-003

#### Steps:
1. Navigate to CRM → Tickets
2. Select ticket using checkbox
3. Click "Delete" button
4. Confirm deletion
5. Verify ticket is removed

#### Expected Results:
- ✅ Ticket disappears from the list
- ✅ Ticket count decreases by 1
- ✅ Success toast message: "Ticket deleted successfully!"

---

## 5. CRM NAVIGATION WORKFLOWS

### 5.1 Navigate Between CRM Sections
**Workflow ID**: CRM-NAV-001

#### Steps:
1. Navigate to any CRM section (Contacts, Companies, Deals, Tickets)
2. Click on the section title (e.g., "Contacts") to open dropdown
3. Select a different section from the dropdown
4. Verify navigation to selected section

#### Available Navigation Options:
- Contacts
- Companies
- Deals
- Tickets
- Lists
- Inbox
- Calls
- Tasks
- Playbooks
- Message Templates
- Snippets

#### Expected Results:
- ✅ Dropdown opens with all CRM options
- ✅ Search functionality works in dropdown
- ✅ Navigation to selected section occurs
- ✅ URL updates to reflect new section
- ✅ Section title updates to show current section

---

## 6. VERIFICATION SCRIPTS

### 6.1 Redux State Verification Functions

```javascript
// Contact State Verification
export const verifyContactState = (state, expectedContact) => {
  const contact = state.contacts.contacts.find(c => c.email === expectedContact.email);
  expect(contact).toBeDefined();
  expect(contact.name).toBe(expectedContact.name);
  expect(contact.email).toBe(expectedContact.email);
  expect(contact.lastActivityDate).toBe("Just now");
};

// Company State Verification
export const verifyCompanyState = (state, expectedCompany) => {
  const company = state.companies.companies.find(c => c.name === expectedCompany.name);
  expect(company).toBeDefined();
  expect(company.domain).toBe(expectedCompany.domain);
  expect(company.lastActivityDate).toBe("Just now");
};

// Deal State Verification
export const verifyDealState = (state, expectedDeal) => {
  const deal = state.deals.deals.find(d => d.name === expectedDeal.name);
  expect(deal).toBeDefined();
  expect(deal.amount).toBe(expectedDeal.amount);
  expect(deal.lastActivityDate).toBe("Just now");
};

// Ticket State Verification
export const verifyTicketState = (state, expectedTicket) => {
  const ticket = state.tickets.tickets.find(t => t.name === expectedTicket.name);
  expect(ticket).toBeDefined();
  expect(ticket.status).toBe(expectedTicket.status);
  expect(ticket.lastActivityDate).toBe("Just now");
};
```

### 6.2 UI State Verification Functions

```javascript
// Modal State Verification
export const verifyModalState = (modalOpen, expectedOpen) => {
  expect(modalOpen).toBe(expectedOpen);
};

// Toast Message Verification
export const verifyToastMessage = (message, expectedMessage) => {
  expect(message).toContain(expectedMessage);
};

// List Count Verification
export const verifyListCount = (currentCount, expectedCount) => {
  expect(currentCount).toBe(expectedCount);
};
```

---

## 7. TESTING CHECKLIST

### 7.1 Pre-Test Setup
- [ ] Clear browser cache and cookies
- [ ] Ensure Redux DevTools are enabled
- [ ] Verify all required dependencies are installed
- [ ] Check that the application loads without errors

### 7.2 Post-Test Verification
- [ ] Verify Redux state is updated correctly
- [ ] Check that UI reflects the changes
- [ ] Confirm toast messages appear
- [ ] Validate that modals open/close properly
- [ ] Ensure navigation works as expected

### 7.3 Error Handling Verification
- [ ] Test with invalid data (empty required fields)
- [ ] Verify error messages appear
- [ ] Check that modals don't close on validation errors
- [ ] Ensure Redux state remains unchanged on errors

---

## 8. PERFORMANCE EXPECTATIONS

### 8.1 Response Times
- Modal opening: < 100ms
- Form submission: < 500ms
- List updates: < 200ms
- Navigation: < 150ms

### 8.2 Memory Usage
- No memory leaks during modal operations
- Redux state size remains reasonable
- Component re-renders are optimized

---

## 9. ACCESSIBILITY REQUIREMENTS

### 9.1 Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order is logical
- Escape key closes modals
- Enter key submits forms

### 9.2 Screen Reader Support
- All form fields have proper labels
- Status messages are announced
- Modal titles are announced when opened

---

This documentation provides a comprehensive guide for testing and verifying all CRM workflows. Each workflow includes step-by-step instructions, expected Redux state changes, and verification scripts to ensure proper functionality. 