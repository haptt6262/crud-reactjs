import * as types from '../constants'
import { put, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/index'

import paginationItems from '../fetchAPIs/paginationItem'
import addItems from '../fetchAPIs/addItem'
import deleteItems from '../fetchAPIs/deleteItem'
import updateItems from '../fetchAPIs/updateItem'
import searchPaginationItems from '../fetchAPIs/searchPagination'

function* paginationListItem(action) {
    try {
        const res = yield paginationItems(action.payload)
        yield put(actions.paginationItemSuccess({ listItem: res.listItem, totalPage: res.totalPage, activePage: action.payload }))
    } catch (error) {
        yield put(actions.paginationItemFailure(error))
    }
}
function* addListItem(action) {
    try {
        yield addItems(action.payload)
        yield put(actions.addItemSuccess())
        yield put(actions.paginationItemRequest(1))
    } catch (error) {
        yield put(actions.addItemFailure(error))
    }
}
function* deleteListItem(action) {
    try {
        yield deleteItems(action.payload)
        yield put(actions.deleteItemSuccess())
        yield put(actions.paginationItemRequest(1))
    } catch (error) {
        yield put(actions.deleteItemFailure(error))
    }
}
function* updateListItem(action) {
    try {
        yield updateItems(action.payload)
        yield put(actions.updateItemSuccess())
        yield put(actions.paginationItemRequest(1))
    } catch (error) {
        yield put(actions.updateItemFailure(error))
    }
}
function* searchPaginationListItem(action) {
    try {
        const res = yield searchPaginationItems(action.payload)
        yield put(actions.searchPaginationItemSuccess({ listItem: res.listItem, totalPage: res.totalPage, activePage: action.payload.activePage, textSearch: action.payload.textSearch }))
    } catch (error) {
        yield put(actions.searchPaginationItemFailure(error))
    }
}
export const ItemSaga = [
    takeEvery(types.PAGINATION_ITEM_REQUEST, paginationListItem),
    takeEvery(types.ADD_ITEM_REQUEST, addListItem),
    takeEvery(types.DELETE_ITEM_REQUEST, deleteListItem),
    takeEvery(types.UPDATE_ITEM_REQUEST, updateListItem),
    takeEvery(types.SEARCH_PAGINATION_ITEM_REQUEST, searchPaginationListItem),
]