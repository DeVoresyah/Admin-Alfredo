export default {
  findName: state => id => state.detailUser.data && state.detailUser.data.name || "",
  findPhone: state => id => state.detailUser.data && state.detailUser.data.phone_number || 0,
  findEmail: state => id => state.detailUser.data && state.detailUser.data.email || ""
}
