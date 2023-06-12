import React from 'react'
import logo from "../Assets/aam.webp"
import main from "../Assets/add.jpeg"

const Home = () => {
  return (
    <div>
      <div className='container-fluid mt-1'>
        <div className='row'>
            
            <p><img src={main} style={{width:"100%",height:"400px"}} alt='Not Found'/></p>
        </div>
     </div>

     <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>

          <div className='col-lg-6'>
            <h1> About Desi Restaurant </h1>
            <hr></hr>
            <h5> Online Food Delivery</h5>
            <p style={{textAlign:"justify"}}> Food is any substance consumed by an organism for nutritional support. Food is usually of plant, animal, or fungal origin, and contains essential nutrients, such as carbohydrates, fats, proteins, vitamins, or minerals. The substance is ingested by an organism and assimilated by the organism's cells to provide energy, maintain life, or stimulate growth. Different species of animals have different feeding behaviours that satisfy the needs of their metabolisms that have evolved to fill a specific ecological niche within specific geographical contexts.

Omnivorous humans are highly adaptable and have adapted to obtain food in many different ecosystems. The majority of the food energy required is supplied by the industrial food industry, which produces food with intensive agriculture and distributes it through complex food processing and food distribution systems. This system of conventional agriculture relies heavily on fossil fuels, which means that the food and agricultural system is one of the major contributors to climate change, accountable for as much as 37% of total greenhouse gas emissions.[1]

The food system has significant impacts on a wide range of other social and political issues including: sustainability, biological diversity, economics, population growth, water supply, and food security. Food safety and security are monitored by international agencies like the International Association for Food Protection, World Resources Institute, World Food Programme, Food and Agriculture Organization, and International Food Information Council.</p>

 <p style={{textAlign:"justify"}}> The National Organic Program (NOP) develops the rules and regulations for the production, handling, labeling, and enforcement of all USDA organic products. This process, referred to as rulemaking, involves input from the National Organic Standards Board (a Federal Advisory Committee made up of fifteen members of the public) and the public.

The national standard states that organic food must be produced without the use of conventional pesticides, petroleum-based fertilizers, sewage-sludge-based fertilizers, herbicides, genetic enginerring (biotechnology), antibiotics, growth hormones, or irradiation. Animals raised on an organic operation must meet animal health welfare standards, not be fed antibiotics or growth hormones, be fed 100% organic feed, and must be provided access to the outdoors.* Land must have no prohibited substances applied to it for at least three years before the harvest of an organic crop. The NOP states that all farms, ranches, and handling operations that display the “USDA Organic” seal must be certified organic by the state or by a private agency, accredited by the USDA, to ensure the NOP standards are followed.

To gain organic certification, a farmer (of cropland, pasture or livestock) submits an organic system plan to an accredited certifier each year. This documents how the farmer adheres to NOP standards. Certified organic farms and processing facilities undergo annual inspections to verify that they are meeting the standards. Organic inspectors examine all elements of a farm operation for adherence to the standards and verfiy that the farm is being managed according to the farmer’s organic system plan.</p>
          </div>

          <div className='col-lg-6'>
            <h1> Benefits of Healthy Eating</h1>
            <hr></hr>
            <p style={{textAlign:'justify'}}>
            <h6><i class="fa fa-arrows" style={{fontSize:"16px"}}></i>  One of the main reasons people eat a healthy diet is to maintain a healthy weight or to lose weight. A healthy weight has a plethora of benefits on its own, but we won’t get into that here.</h6>
             <h6><i class="fa fa-arrows" style={{fontSize:"16px"}}></i>  Even if you’re young, you should think about your heart health, especially considering that as many as 92.1 million people in the U.S. have some type of cardiovascular disease. Healthy eating habits can improve your heart health and common prevent heart diseases.</h6>
             <h6><i class="fa fa-arrows" style={{fontSize:"16px"}}></i>  Eating healthy increases blood flow to the brain, which help prevent brain diseases like Alzheimer’s, dementia, and cognitive decline.</h6>
            </p>

            <p className='mt-3'> <img src={logo} style={{width:"100%",height:"200px;"}} alt='not found'/></p>
          </div>
            
        </div>
     </div>
    </div>
  )
}

export default Home
