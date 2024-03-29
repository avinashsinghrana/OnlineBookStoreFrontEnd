// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  baseUrl: "http://localhost:8081",
  loginPath: "/user/login",
  registrationPath: "/user/register",
  forgotPasswordPath: "/user/forgotpassword",
  resetPasswordPath: "/user/resetpassword?token=",


  bookApiUrl: "http://localhost:8081/books",
  getBooksList: "getAllBooks",
  getSellerBookList: "sellerBooks",
  addbook: "add",
  deleteBook: "delete",
  addBookImage: "upload",



  cartApiUrl: "http://localhost:8081/orders",
  addToBag: "AddToCart",
  cartList: "cart-list",
  deleteOrder: "remove-order",
  updateQuantity: "update-quantity",
  confirmOrder: "confirm-order",
  profilePicPath: "/user/uploadFile",
  addBookPath: "/sellers/addBook",
  addimg:'/sellers/addImg',
  addImg:'/user/addImg'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
