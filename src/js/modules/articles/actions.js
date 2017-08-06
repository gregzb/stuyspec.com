import axios from 'axios';
import * as t from './actionTypes';
import {STUY_SPEC_API, HEADER} from '../../constants';

//TODO: need a way to call the fetch function
export const fetchArticles = () => {
  return (dispatch) => {
    dispatch({ type: t.FETCH_ARTICLE_PENDING });
    axios.get(`${STUY_SPEC_API}/articles`, {'headers': HEADER})
      .then((response) => {
        if (isArticleValid(response.data)) {
          dispatch({
            type: t.FETCH_ARTICLE_FULFILLED,
            payload: response.data,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_ARTICLE_REJECTED,
          payload: err
        })
      })
  };
};
const isKeyValid = (articleObject, key, type) => {
  if (key in articleObject) {
    if (typeof (articleObject[ key ]) === type) {
      return true;
    } else {
      throw `Error: The data type of the key ${key} is incorrect.`
    }
  } else {
    throw `Error: The key ${key} is missing in the article object.`
  }
};
const isArticleValid = (articleArray) => {
  //const integerProperties = [ 'id', 'volume', 'issue', 'sectionId' ];
  //TODO: Add this one ^^ back in once volume and issue are not null
  const integerProperties = ['id', 'sectionId' ];
  const stringProperties = [ 'title', 'slug', 'content', "createdAt", "updatedAt" ];
  //const booleanProperties = [ 'isDraft' ];
  //TODO: Add this one ^^ back in once isDraft is not null for some of the articles
  if (!Array.isArray(articleArray)) {
    throw 'Error: Response is not an array.'
  }
  articleArray.forEach((articleObject) => {
    integerProperties.forEach((numberKey) => {
      if (!isKeyValid(articleObject, numberKey, 'number')) {
        throw 'Error: Key Error'
      }
    });
    stringProperties.forEach((stringKey) => {
      if (!isKeyValid(articleObject, stringKey, 'string')) {
        throw 'Error: Key Error'
      }
    });
    /*
    booleanProperties.forEach((booleanKey) => {
      if (!isKeyValid(articleObject, booleanKey, 'boolean')) {
        throw 'Error: Key Error'
      }
    });
    TODO: Add this back in once ALL the values of isDraft is not null
    */
  });
  return true;
};