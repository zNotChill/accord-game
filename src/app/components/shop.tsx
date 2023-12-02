import { ShopInterface } from "@/libs/shop"

function ShopItem(props: ShopInterface) {
  return (
    <div className="outline outline-1 outline-green p-5 flex flex-1 justify-between hover:bg-green transition-all">
      <div className="flex flex-col">
        <span className="text-green">{props.name}</span>
        <span className="text-gray-400">{props.price}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-green">{props.amountBought}</span>
        <span className="text-gray-400">amount bought</span>
      </div>
    </div>
  )
}

export default function Shop(props: { userData: any }) {
  
  return (
    <div>
      <h1 className="text-xl">Shop</h1>
      <hr />
      {
        console.log(props.userData)}
      {
        
        props.userData.shop.map((item: ShopInterface) => {
          console.log(item);
          
          return <ShopItem {...item} />
        })
      }
    </div>
  )
}