// import { product } from "./product"

// export class ProductRepository {
//     private products:product[] = [
//         // {
//         //   id: 1,
//         //   name: "Iphone 14",
//         //   price: 20000,
//         //   imageURL: "1.jpeg",
//         //   description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//         //   isActive: true,
//         //   categoryID: 1
//         // },
//         // {
//         //   id: 2,
//         //   name: "Iphone 15",
//         //   price: 30000,
//         //   imageURL: "2.jpeg",
//         //   description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//         //   isActive: true,
//         //   categoryID: 1
//         // },
//         // {
//         //   id: 3,
//         //   name: "Iphone 15 pro",
//         //   price: 40000,
//         //   imageURL: "3.jpeg",
//         //   description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//         //   isActive: true,
//         //   categoryID: 1
//         // },
//         // {
//         //   id: 4,
//         //   name: "Macbook Pro 16",
//         //   price: 70000,
//         //   imageURL: "m1.jpg",
//         //   description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//         //   isActive: true,
//         //   categoryID: 2
//         // },
//         // {
//         //   id: 5,
//         //   name: "iPad Pro",
//         //   price: 45000,
//         //   imageURL: "t1.webp",
//         //   description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//         //   isActive: true,
//         //   categoryID: 3
//         // }
//       ]

//       getProducts() {
//         return this.products.filter(p=>p.isActive)
//       }

//       getProductbyId(ID: number) {
//         return this.products.find(p=>p.id == ID)
//       }

//       getProductsbyCategoryID(ID: number) {
//         return this.products.filter(c=>c.categoryID==ID)
//       }
// }