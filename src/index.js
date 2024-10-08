import React from 'react';
import ReactDOM from 'react-dom';
import { Jira } from '@optimizely/optly-components';
import Immutable from 'immutable';
import JiraLink from '@optimizely/optly-components/src/Jira/Link/Link';
import JiraIssues from '@optimizely/optly-components/src/Jira/Issues/Issues';
const generateMockIssues = (count) => {
    let mockIssues = [];
    for (let i = 0; i < count; i++) {
        mockIssues.push({
            id: i,
            source: {
                type: 'feature',
                resource_id: i + Date.now(),
            },
            target: {
                type: 'jira_issue',
                resource_id: '1111-222-3333333:10001',
                extra_data: {
                    issue_key: `MGMT-${i}`,
                }
            }
        })
    }
    return mockIssues
};

const issuesList = Immutable.fromJS(generateMockIssues(100));

const onUnlink = (issue) => {
    console.log('Unlink issue:', issue.getIn(['target', 'extra_data', 'issue_key']));
    // Simulate an async operation
    return new Promise((resolve) => setTimeout(resolve, 1000));
};

const searchFunctions = {
    byKey: (key) => {
        // Perform a search by Jira issue key
        return Promise.resolve([
            { id: '1001', key: 'ISSUE-1' },
            { id: '1002', key: 'ISSUE-2' },
        ]);
    },
    byProject: (projectId) => {
        // Perform a search by Jira project
        return Promise.resolve([
            { id: '2001', key: 'PROJ-1' },
            { id: '2002', key: 'PROJ-2' },
        ]);
    },
    byText: (text) => {
        // Perform a text search
        return Promise.resolve([
            { id: '3001', key: 'TEXT-1' },
            { id: '3002', key: 'TEXT-2' },
        ]);
    },
};

// Mock Jira issues already linked (Immutable List of issues)
const linkedIssues = Immutable.List([
    Immutable.fromJS({
        source: {},
        target: {
            type: 'jira_issue',
            resource_id: 'tenant1:1001',
            extra_data: {
                issue_key: 'ISSUE-1',
            },
        },
    }),
    Immutable.fromJS({
        source: {},
        target: {
            type: 'jira_issue',
            resource_id: 'tenant1:1002',
            extra_data: {
                issue_key: 'ISSUE-2',
            },
        },
    }),
]);

// Example onSave function
const handleSave = (linksToCreate, linkIdsToDelete) => {
    console.log('Links to create:', linksToCreate);
    console.log('Links to delete:', linkIdsToDelete);
    return Promise.resolve(); // Simulate a save operation
};

// Example onCancel function
const handleCancel = () => {
    console.log('Cancelled linking Jira issues');
};

const App = () => (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%", // Full width
        textAlign: "center" // Center the text as well
    }}>
        {/* <JiraIssues
            issues={issuesList}
            onUnlink={onUnlink}
            pageSize={3}
            tenantUrl={"null"}
        /> */}

        <JiraLink
            onSave={handleSave}
            onCancel={handleCancel}
            links={linkedIssues}
            tenantId="tenant1"
            searchFunctions={searchFunctions}
            recentIssues={[]}
            loadingRecentIssues={false}
        />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
