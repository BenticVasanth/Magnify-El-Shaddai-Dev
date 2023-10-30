import { defineStore } from 'pinia'
export const useCommonStore = defineStore("commonstore", {
  state: () => ({
    tokenId: '',
    secureToken: '',
    dataValues: {
      secureToken: '',
      tokenId: '',
      pageloading: false,
      userSesId: '',
      data: '',
      mailSmsToken: '',
      loginID: '',
      themecolor: {},
      themetype: true,
      below960: false,
      sidemenu: 0,
      right_sidemenu: 0,
      isActive: true,
      userId: '',
      organisation: {},
      orgList: Array,
      userLevel: '',
      selectBoxOrgList: Array,
      orgListname: [],
      portalSubName: '',
      portalName: '',
      bestSiteView: '',
      selectAllOrgList: false,
      version: '',
      loginPasswordUniqueKey:'',
      selectExistorg:[]
    },
    Commondata: ''

  }),
  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
  // persist: true,
  getters: {
    getloadeddata(state) {
      return state.dataValues
    },
    getToken(state) {
      return state.tokenId
    },
    getsidemenu(state) {
      return state.dataValues
    }
  }

})