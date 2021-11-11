import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import { useHistory } from "react-router-dom";

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: theme.colors.backgroundPrimary
  }
});

const Header = ({ fetch, selectedSort, setSelectedSort, searchQuery, setSearchQuery }) => {
  return (
    <View>
      <SearchField fetch={fetch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SortPicker fetch={fetch} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
    </View>
  );
};

const SearchField = ({ searchQuery, setSearchQuery, fetch }) => {
  const debounced = useDebouncedCallback((value) => {
    fetch({ searchKeyword: value });
  }, 500);

  const onChangeSearch = query => {
    setSearchQuery(query);
    debounced(query);
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};


const SortPicker = ({ fetch, selectedSort, setSelectedSort }) => {

  const handleValue = (itemValue) => {
    switch (itemValue) {
      case 'latest':
        fetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
        break;
      case 'highest':
        fetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
        break;
      case 'lowest':
        fetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSort}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedSort(itemValue);
          handleValue(itemValue);
        }
        }>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );

};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, fetch, onEndReach }) => {
  const history = useHistory();
  const [selectedSort, setSelectedSort] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }) => (
    <Pressable onPress={() => history.push(item.id)}>
      <RepositoryItem {...item} />
    </Pressable>
  );

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <Header
          fetch={fetch}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      testID="nodesList"
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const { repositories, fetch, fetchMore } = useRepositories({
    first: 10
  });

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };
  
  return <RepositoryListContainer repositories={repositories} fetch={fetch} onEndReach={onEndReach}/>;
};

export default RepositoryList;