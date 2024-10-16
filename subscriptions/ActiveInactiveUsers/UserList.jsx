import React from "react";
import UserItem from "./UserItem";

const users = [
  {
    name: "Bessie Cooper",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1dfd37580827f440aa09373cd8f7beb97dbfb8f772d5633be180a8f4969f2444?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
    isNew: true,
  },
  {
    name: "Robert Fox",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0c281dfe4d4bae1263fd32d226caf4e59c870edc657abed110c310a05b8bb987?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Courtney Henry",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/df54ae91324e8277a90706f279a8690f8198ed0edc44529c9c9e75ec6045b8b3?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Noel Mariano",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f2c2c7e56b80073c4031fd2f47b574334db5025761d3ef226f746b9175ab69a0?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Annette Black",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3981bb1827015fc0752f1e490f7a1255febdd5b01d812b2d5113529d4a031d5a?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Eleanor Pena",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1839fa31315d5877fa3c469f060509ecc05339a7264426dde55dfeae953453da?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Savannah Nguyen",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2c4134353d91f21d099f61c9d52438d34e5bb9066454e72fb523b698e38ebac2?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Raul Vasquez",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5a440ef4b1f3f7bfa43e0cf0fa5e4ea282164f86c2b57a15314c3cb623825c68?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Ronald Richards",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d45665e867cd4687c7d645a97cef5513f6a01a0c543d189a288003af6f8dee2a?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Devon Lane",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/9875cc866b3a26daa5131d6d55208ff8bc2da8cee59e7a8d760deb64bcaa1d79?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
  {
    name: "Kristin Watson",
    id: "LT #2526",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1f38d6092f10593410bb6c313d60d78c9b68fa6c1e279d4475c97b2cf0d1822d?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39",
  },
];

function UserList() {
  return (
    <ul className="flex flex-col p-0 mt-4 mb-6 list-none">
      {users.map((user, index) => (
        <UserItem key={index} {...user} />
      ))}
    </ul>
  );
}

export default UserList;