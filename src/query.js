export const githubQuery = ({
  queryString = "",
  paginationKeyword = "first",
  pageCount = 10,
  paginationString = "",
}) => `
  {
    viewer {
      name
      login
    }
    search(query: "${queryString} user:anshu1016 sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount} ${
  paginationString ? `, ${paginationString}` : ""
}) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            description
            id
            url
            viewerSubscription
            licenseInfo {
              spdxId
            }
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
  `;
