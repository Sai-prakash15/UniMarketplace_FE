import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { backend_url } from "../../constants"
import { Action } from "../constants";
import { storeListData, apiCalled, storeCategories } from "../actions";
import axios from "axios";
// yield pauses and resume the generator functions

function* getProductList(data) {
   try {
    let url;
    if (data.data.category === 0){
      url = `${backend_url}/product_section/all_products/?search=${data.data?.value}`
    }
    else{
      url = `${backend_url}/product_section/all_products/?categories=${data.data?.category}&search=${data.data?.value}`
    }
      console.log("here", data)
     const response = yield axios.get(url ,{ headers: {} });
     if (response.status === 200) {
       // to fire another action, use put method
       // here I am storing the data by firing action LIST_FETCHED
       console.log(response.data)
       yield put(storeListData(response.data));
       // for calling another generator funtion use call method
     } else {
        // handle other response code
     }
    } catch (error) {
      console.log(error);
    } finally {
      yield put(apiCalled());
    }
}

function* getCategories(data) {
  try {
   let url;
    console.log("here", data)
    const response = yield axios.get(`${backend_url}/product_section/categories/` ,{ headers: {} });
    if (response.status === 200) {
      // to fire another action, use put method
      // here I am storing the data by firing action LIST_FETCHED
      console.log(response.data)
      yield put(storeCategories(response.data));
      // for calling another generator funtion use call method
    } else {
       // handle other response code
    }
   } catch (error) {
     console.log(error);
   } finally {
     yield put(apiCalled());
   }
}

function* appSagas() { 
    yield takeLatest(Action.FETCH_DATA, getProductList);
    yield takeLatest(Action.FETCH_CATEGORIES, getCategories);
}

export default appSagas;