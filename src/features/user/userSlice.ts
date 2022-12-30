

export interface User {
  user: {
    _id: {
      $oid: string
    },
    name: string,
    email: string,
    gender: 'Male' | 'Female' | 'Others',
    dob: {
      "$date": {
        "$numberLong": "1101686400000"
      }
    },
    username: string,
    password: string,
    coins: number,
    __v: number
  },
  status: 'null' | 'fetching' | 'active' | 'failed',
};