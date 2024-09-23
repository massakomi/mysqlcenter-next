//import {setValue} from "@/lib/features/paramsReducer";
//import {useDispatch} from "react-redux";

export const  metadata = {
  title: 'Операции над базой ?'
}

export default function Page({params}) {

  // only client component
  //const dispatch = useDispatch()
  //dispatch(setValue({database: params.db}))

  return (
    <>
      <h1>{`Операции над базой ${params.db}`}</h1>
    </>
  );
}
