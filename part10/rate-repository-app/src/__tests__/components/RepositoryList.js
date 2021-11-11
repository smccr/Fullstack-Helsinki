import React from 'react';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { render } from '@testing-library/react-native';


describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    const repositories = {
      totalCount: 8,
      pageInfo: {
        hasNextPage: true,
        endCursor:
          'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
          cursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        },
      ],
    };

    const repoSize = repositories.edges.length;

    const formatNumber = (n) => {
      if (n >= 1000) {
        const newNumber = parseFloat((n / 1000).toFixed(1));
        const newNumberTruncated = Math.trunc(newNumber);
  
        if (newNumber / newNumberTruncated === 0) {
          return `${newNumberTruncated}k`;
        }
        return `${newNumber}k`;
      }
      return n;
    };

    it('Name is correct', () => {
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const testName = getAllByTestId("fullName");
      expect(testName).toHaveLength(repoSize);

      testName.forEach((value, index) => {
        expect(value).toHaveTextContent(repositories.edges[index].node.fullName);
      });
    });

    it('Description is correct', () => {
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const testDescription = getAllByTestId("description");
      expect(testDescription).toHaveLength(repoSize);
      
      testDescription.forEach((value, index) => {
        expect(value).toHaveTextContent(repositories.edges[index].node.description);
      });
    });
    it('Language is correct', () => {
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const testLanguage = getAllByTestId("language");
      expect(testLanguage).toHaveLength(repoSize);

      testLanguage.forEach((value, index) => {
        expect(value).toHaveTextContent(repositories.edges[index].node.language);
      });
    });
    it('Stars is correct', () => {
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const testStars = getAllByTestId("stars");
      expect(testStars).toHaveLength(repoSize);

      testStars.forEach((value, index) => {
        expect(value).toHaveTextContent(formatNumber(repositories.edges[index].node.stargazersCount));
      });
    });
    it('Forks is correct', () => {
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const testForks = getAllByTestId("forks");
      expect(testForks).toHaveLength(repoSize);

      testForks.forEach((value, index) => {
        expect(value).toHaveTextContent(formatNumber(repositories.edges[index].node.forksCount));
      });
    });
    it('Reviews is correct', () => {
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const testReviews = getAllByTestId("reviews");
      expect(testReviews).toHaveLength(repoSize);

      testReviews.forEach((value, index) => {
        expect(value).toHaveTextContent(formatNumber(repositories.edges[index].node.reviewCount));
      });
    });
    it('Rating is correct', () => {
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const testRating = getAllByTestId("rating");
      expect(testRating).toHaveLength(repoSize);

      testRating.forEach((value, index) => {
        expect(value).toHaveTextContent(formatNumber(repositories.edges[index].node.ratingAverage));
      });
    });
    
  });
});