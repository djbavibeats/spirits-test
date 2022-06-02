import Vue from 'vue'

const geometric = require('geometric')

export const state = () => ({
  currentQuestion: 0,
  answers: [],
  size: 1080
})

export const getters = {  
  binaryAnswers(state) {
    return state.answers.filter(answer => answer.type == 'binary')
  },
  rangeAnswers(state) {
    return state.answers.filter(answer => answer.type == 'range')
  },
  binaryScore(state, getters) {
    if (getters.binaryAnswers.length) {
      return getters.binaryAnswers.map(answer => answer.answer).reduce((sum, a) => sum + a)
    } else {
      return 0
    }
  },
  center(state) {
    return state.size / 2
  },
  points(state, getters) {
    let getPoint = (angle, distance) => {
      let center = getters.center
      let radius = center / 3

      let x = center + radius * Math.cos(-angle * Math.PI / 180) * distance
      let y = center + radius * Math.sin(-angle * Math.PI / 180) * distance

      return [x, y]
    }

    return getters.rangeAnswers.map(answer => {
      return getPoint(answer.angle, answer.answer)
    })
  },
  mean(state, getters) {
    if (getters.points.length) {
      return geometric.polygonMean(getters.points)
    } else {
      return null
    }
  },
  centroid(state, getters) {
    if (getters.points.length) {
      return geometric.polygonCentroid(getters.points)
    } else {
      return null
    }
  },
  quadrant(state, getters) {
    if (getters.mean) {
      let center = getters.center

      if (getters.mean[0] < center) {
        if (getters.mean[1] < center) {
          return 2
        } else {
          return 3
        }
      } else {
        if (getters.mean[1] < center) {
          return 1
        } else {
          return 4
        }
      }
    } else {
      return null
    }
  },
  position(state, getters) {
    if (Math.sign(getters.binaryScore) == 1) {
      return 'top'
    } else {
      return 'bottom'
    }
  },
  symbol(state, getters) {
    // return 'Force'    

    if (getters.quadrant) {
      if (getters.quadrant == 1) {
        if (getters.position == 'top') {
          return 'Exie'
        } else {
          return 'Tru'
        }
      } else if (getters.quadrant == 2) {
        if (getters.position == 'top') {
          return 'Elemental'
        } else {
          return 'Fuse'
        }
      } else if (getters.quadrant == 3) {
        if (getters.position == 'top') {
          return 'Cor'
        } else {
          return 'Ballast'
        }
      } else {
        if (getters.position == 'top') {
          return 'Force'
        } else {
          return 'Constant'
        }
      }      
    } else {
      return null
    }
  }
}

export const mutations = {
  incrementCurrentQuestion(state, payload) {
    state.currentQuestion += 1
  },
  decrementCurrentQuestion(state, payload) {
    state.currentQuestion -= 1
  },
  updateAnswer(state, payload) {
    Vue.set(state.answers, payload.index, payload.value)
  }
}
