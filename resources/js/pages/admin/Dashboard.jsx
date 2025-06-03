import QuickActions from '../../Components/Dashboard/QiuckActions';
import AvailableRooms from '../../Components/Dashboard/AvailableRooms/AvailableRooms';
import AbsenceStatics from '../../Components/Dashboard/AbsenceStatics';
import { CardsGrid } from '../../Components/Dashboard/Cards';
import AbsenceByFilieres from '../../Components/Dashboard/AbsenceByFilieres';
import AbsenceRanking from '../../Components/Dashboard/AbsenceRnaking';
import Layout from '../../layouts/Layout';


export default function Dashboard ({cardsInfo,availableRooms,days,timeSlots}){
  return (
    <Layout>
      <div className='select-none max-w-7xl mx-auto space-y-6 pr-4 pl-10 py-6'>
        {/* <ToastContainer pauseOnHover={false} closeButton={false} /> */}
        <QuickActions />

        <CardsGrid  cardsInfo={cardsInfo}/>


        <AbsenceStatics/>

        <AbsenceByFilieres/>
        
        <AvailableRooms availableRooms={availableRooms} days={days} timeSlots={timeSlots}/>
        
        <AbsenceRanking/>

      </div>

    </Layout>
   
  );
}      