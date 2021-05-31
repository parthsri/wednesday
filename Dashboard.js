import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    initiateGetResult,
    initiateLoadMoreAlbums,
    initiateLoadMorePlaylist,
    initiateLoadMoreArtists
  } from '../actions/results';
const Dashboard = () => {
 return <div>Dashboard Page</div>;
};
const { isValidSession, history } = props;
const handleSearch = (searchTerm) => {
  if (isValidSession()) {
    setIsLoading(true);
    props.dispatch(initiateGetResult(searchTerm)).then(() => {
      setIsLoading(false);
      setSelectedCategory('albums');
    });
  } else {
    history.push({
      pathname: '/',
      state: {
        session_expired: true
      }
    });
  }
};
const loadMore = async (type) => {
    if (isValidSession()) {
      const { dispatch, albums, artists, playlist } = props;
      setIsLoading(true);
      switch (type) {
        case 'albums':
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case 'artists':
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case 'playlist':
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
    return (
        <React.Fragment>
          {isValidSession() ? (
            <div>
              <Header />
              <SearchForm handleSearch={handleSearch} />
              <Loader show={isLoading}>Loading...</Loader>
              <SearchResult
                result={result}
                loadMore={loadMore}
                setCategory={setCategory}
                selectedCategory={selectedCategory}
                isValidSession={isValidSession}
              />
            </div>
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  session_expired: true
                }
              }}
            />
          )}
        </React.Fragment>
      );
      
  }

  

  export default Dashboard;