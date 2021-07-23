import React from 'react';
import { render, fireEvent } from '@testing-library/jest-native';

import Login from '../screens/LoginScreen';
import Search from '../constants/Search';

beforeEach(() => {
    // Login
    const { getByTestId } = render(<Login />);
    fireEvent.changeText(getByTestId('Login.emailInput'), 'mchj2468@gmail.com');
    fireEvent.changeText(getByTestId('Login.passwordInput'), 'correctpw');
    fireEvent.press(getByTestId('Login.Button'));
})

test('return no results for empty search', () => {
    const { getByTestId, queryAllByText } = render(<Search />);
    fireEvent.changeText(getByTestId('Search.searchInput'), ' ');
    
    expect(queryAllByText('0 result(s)').length).toBe(2);
});

test('test non-case sensitivity of search', () => {
    const { getByTestId, queryAllByText } = render(<Search />);
    fireEvent.changeText(getByTestId('Search.searchInput'), 'McHj2468');
    expect(queryAllByText('0 result(s)').length).not.toBe(2);

    fireEvent.changeText(getByTestId('Search.searchInput'), 'USEr tEStiNg cHanNEl');
    expect(queryAllByText('0 result(s)').length).not.toBe(2);
});

test('show live search results', () => {
    const { getByTestId, queryAllByText } = render(<Search />);
    fireEvent.changeText(getByTestId('Search.searchInput'), 'M');

    expect(queryAllByText('0 result(s)').length).toBe(0);
});

test('show search history', () => {
    const { getByTestId } = render(<Search />);
    fireEvent.changeText(getByTestId('Search.searchInput'), '');

    expect(getByTestId('Search.searchHistElem').length).not.toBe(0);
});

test('delete a search history suggestion', () => {
    const { getByTestId, getAllByA11yLabel } = render(<Search />);
    fireEvent.changeText(getByTestId('Search.searchInput'), '');
    const searchHistElemCount = getByTestId('Search.searchHistElem').length;
    const delSearchHistElem = getAllByA11yLabel('Search.DelButton');
    fireEvent.press(delSearchHistElem[0]);

    expect(getByTestId('Search.searchHistElem').length).toBe(searchHistElemCount - 1);
});

test('navigate from search query -> user search results -> view/add User', () => {
    const { getByTestId, getByText, getAllByA11yLabel } = render(<Search />);
    fireEvent.changeText(getByTestId('Search.searchInput'), 'Tianom');
    const SearchResElem = getAllByA11yLabel('Search.ResultButton');
    fireEvent.press(SearchResElem[0]);
    const UserResElem = getAllByA11yLabel('Search.UserResultButton');
    fireEvent.press(UserResElem[0]);

    expect(getByText('Add User').length).toBe(1);
});

test('navigate from search query -> channel search results -> view/add Channel', () => {
    const { getByTestId, getByText, getAllByA11yLabel } = render(<Search />);
    fireEvent.changeText(getByTestId('Search.searchInput'), 'testing channel');
    const SearchResElem = getAllByA11yLabel('Search.ResultButton');
    fireEvent.press(SearchResElem[0]);
    const ChannelResElem = getAllByA11yLabel('Search.ChannelResultButton');
    fireEvent.press(ChannelResElem[0]);

    expect(getByText('Channel Info').length).toBe(1);
});