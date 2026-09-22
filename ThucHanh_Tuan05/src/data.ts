export type Book = {
  id: number;
  name: string;
  author: string;
  price: number;
  image: string;
  discount?: string;
};

export const books: Book[] = [
  {
    id: 1,
    name: "Nhà giả kim",
    author: "Paulo Coelho",
    price: 89000,
    image: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    discount: "-20%",
  },
  {
    id: 2,
    name: "Đắc nhân tâm",
    author: "Dale Carnegie",
    price: 95000,
    image: "https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg",
  },
  {
    id: 3,
    name: "Atomic Habits",
    author: "James Clear",
    price: 129000,
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    discount: "Mới",
  },
  {
    id: 4,
    name: "The Alchemist",
    author: "Paulo Coelho",
    price: 110000,
    image: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
  },
  {
    id: 5,
    name: "Deep Work",
    author: "Cal Newport",
    price: 135000,
    image: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
  },
];

export const categories = [
  "Văn học",
  "Kinh tế",
  "Thiếu nhi",
  "Kỹ năng sống",
  "Truyện tranh",
  "Ngoại ngữ",
  "Lịch sử",
];

export const formatPrice = (price: number) =>
  price.toLocaleString("vi-VN") + "đ";