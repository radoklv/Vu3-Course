export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
    };
  },

  getters: {
    getCoaches(state) {
      return state.coaches;
    },

    hasCoaches(state) {
      return state.coaches.length > 0;
    },

    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.getCoaches;
      const userId = rootGetters.getUserId;

      return coaches.some(el => el.id === userId)
    },
  },

  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload);
    },

    setCoaches(state, payload){
      state.coaches = payload
    } 
  },

  actions: {
    async addCoach(context, payload) {
      const userId = context.rootGetters.getUserId

      const newCoach = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        areas: payload.areas,
        description: payload.description,
        hourlyRate: payload.hourlyRate,
      };

     const response = await fetch(`https://find-coach-my-version-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,{
        method: 'PUT',
        body: JSON.stringify(newCoach)
      })

      if(!response.ok){
        //error
      }

      context.commit("addCoach", {
        ...newCoach,
        id: userId
      });
    },

    async fetchCoaches(context){
      const response = await fetch('https://find-coach-my-version-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')

      const responseData = await response.json()

      const coaches = []

      for(var key in responseData){
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          areas: responseData[key].areas,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate
        } 

        coaches.push(coach)
      }

      context.commit('setCoaches', coaches)
    }
  },
};
