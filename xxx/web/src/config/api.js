import axios from 'axios'
// import cache from './cache'

// const apiSrv = 'http://localhost:3001'
const apiSrv = 'http://192.168.1.226:3001'
// const apiSrv = ''

/**
 * @author 秦超 on 2018年8月23日
 * @returns agents List
 */
export const getAgentsList = async () => {
  const res = await axios.get(`${apiSrv}/agents`, {
    // adapter: cache({
    //   local: false // 是否永久保留在本地，默认为false
    // })
  })
  return res.data
}

/**
 * @author 秦超 on 2018年8月23日
 * @param id
 * @returns agents
 */
export const getAgents = async (id) => {
  const res = await axios.get(`${apiSrv}/agents/${id}`, {
    // adapter: cache({
    //   local: false // 是否永久保留在本地，默认为false
    // })
  })
  return res.data
}

/**
 * @author 秦超 on 2018年8月23日
 * @param id
 * @returns agents
 */
export const upAgents = async (id, data) => {
  const res = await axios.put(`${apiSrv}/agents/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.data
}

/**
 * @author 秦超 on 2018年8月23日
 * @returns logs
 */
export const getLogs = async () => {
  const res = await axios.get(`${apiSrv}/logs`)
  return res.data
}
