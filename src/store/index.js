import { createStore } from 'vuex';
import db from "../firebase/firebaseInit";
import { collection, getDocs } from 'firebase/firestore';

export default createStore({
  state: {
    invoiceData: [],
    invoiceModal: null,
    modalActive: null,
    invoicesLoaded: null,
    curentInvoiceArray: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload);
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.curentInvoiceArray = state.invoiceData.filter(invoice => {
        return invoice.invoiceId === payload;
      })
    }
  },
  actions: {
    async GET_INVOICES({ commit, state }) {
      const getData = collection(db, "invoices");
      const results = await getDocs(getData);
      results.forEach(doc => {
        if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDate: doc.data().invoiceDate,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDate: doc.data().paymentDueDate,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoucePaid: doc.data().invoucePaid,
          };
          commit('SET_INVOICE_DATA', data);
        }
      });
      commit('INVOICES_LOADED');
    }
  },
  modules: {
  }
})