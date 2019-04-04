from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from kayakapi.models import Flight,Airport,Country,TravelClass
from kayakapi.serializers import FlightSerializer, AirportSerializer,CountrySerializer,TravelClassSerializer
from datetime import datetime,timedelta
# Create your views here.

class CountriesList(APIView):
    def get(self,*args, **kwargs):

        countries = Country.objects.all()
        countries_serializer = CountrySerializer(countries,many=True)

        return Response(countries_serializer.data)

class Class_TypeList(APIView):
    def get(self,*args, **kwargs):

        classType = TravelClass.objects.all()
        countries_serializer = TravelClassSerializer(classType,many=True)

        return Response(countries_serializer.data)


class FlightList(APIView):
    days_elapsed = 0
    def get(self,*args, **kwargs):
        # print(len(self.kwargs))
        # ** Recursive method **  - - -  GETS the out and in FLights into dict and return it
        def getOutInFlights(origin,destiny,out_Date,in_Date):
            ## GETTING OUT FLIGHTS
            results = []
            outFlights = Flight.objects.filter(orig=origin,dest=destiny,out_date=out_Date)
            outFlights_serializer = FlightSerializer(outFlights, many=True)
            ## GETTING IN FLIGHTS
            inFlights = Flight.objects.filter(orig=destiny,dest=origin,out_date=in_Date)
            inFlights_serializer = FlightSerializer(inFlights, many=True)
            if len(outFlights_serializer.data) == 0 or len(inFlights_serializer.data) == 0:
                # TAKE IN AND OUT DATES and Parse into datetime
                new_outDate = datetime.strptime(str(out_Date),"%Y-%m-%d")
                new_inDate = datetime.strptime(str(in_Date),"%Y-%m-%d")
                # ADD +1 day to the right date, to find results, even 
                if(self.days_elapsed == 6): 
                    #If 6 days elpased, return False (means that we dont found any flight, send alert!)
                    self.days_elapsed = 0
                    return False 
                elif(len(outFlights_serializer.data) == 0):
                    new_outDate = new_outDate + timedelta(days=1)
                    self.days_elapsed = self.days_elapsed + 1
                elif (len(inFlights_serializer.data) == 0):
                    new_inDate = new_inDate + timedelta(days=1)
                    self.days_elapsed = self.days_elapsed + 1
                results = getOutInFlights(origin,destiny,new_outDate.date(),new_inDate.date())
            else:
                newData_list =[]
                
                for outF in outFlights_serializer.data: 
                    for inF in inFlights_serializer.data:
                        newData_list.append({'out':outF,'in':inF})       
                        

                 
                # WHEN WE HAVE RESULTS FOR IN AND OUT DATES then RETURN THE DATA

                results = newData_list
                #print(results)
            return results

        def getOutFlights(origin,destiny,out_Date):
            ## GETTING OUT FLIGHTS
            results = []
            outFlights = Flight.objects.filter(orig=origin,dest=destiny,out_date=out_Date)
            outFlights_serializer = FlightSerializer(outFlights, many=True)
          
            if len(outFlights_serializer.data) == 0:
                # TAKE IN AND OUT DATES and Parse into datetime
                new_outDate = datetime.strptime(str(out_Date),"%Y-%m-%d")
               
                # ADD +1 day to the right date, to find results, even 
                if(self.days_elapsed == 6): 
                    #If 6 days elpased, return False (means that we dont found any flight, send alert!)
                    self.days_elapsed = 0
                    return False 
                elif(len(outFlights_serializer.data) == 0):
                    new_outDate = new_outDate + timedelta(days=1)
                    self.days_elapsed = self.days_elapsed + 1

                results = getOutFlights(origin,destiny,new_outDate.date())
            else:    
                # WHEN WE HAVE RESULTS FOR IN AND OUT DATES then RETURN THE DATA
                results = outFlights_serializer.data
                #print(results)
            return results

        def getFlight(id):
            ## GETTING OUT FLIGHTS
            results = []
            flight = Flight.objects.get(id=id)
            flight_serializer = FlightSerializer(flight, many=False)

            results = flight_serializer.data
                #print(results)
            return [results]

        def getFlights(id,inid):
            ## GETTING OUT FLIGHTS
            results = []
            flight = Flight.objects.get(id=id)
            flight_serializer = FlightSerializer(flight, many=False)

            flightIn = flight = Flight.objects.get(id=inid)
            flightIn_serializer = FlightSerializer(flightIn, many=False)

            results.append({'out':flight_serializer.data,'in':flightIn_serializer.data})      
            
                #print(results)
            return [results]



        if len(self.kwargs) == 1:
            flight_id = self.kwargs['id']
            
            flight_result = getFlight(flight_id)
           
            return Response (flight_result)
        if len(self.kwargs) == 2:
            flight_id = self.kwargs['id']
            flight_inId =self.kwargs['inid']
            flight_result = getFlights(flight_id,flight_inId)
           
            return Response (flight_result)
        elif len(self.kwargs) == 4:
            out_date = self.kwargs['out_date']
            in_date = self.kwargs['in_date']
            flight_orig = self.kwargs['origin']
            flight_dest = self.kwargs['destiny']

            flights_result = getOutInFlights(flight_orig,flight_dest,out_date,in_date)
            # cond = ( flights_result != False) or flights_result
            cond = True
            
            return Response (flights_result if cond else {"error": "No flights Founded"})
            
        elif len(self.kwargs) == 3:
            out_date = self.kwargs['out_date']
            flight_orig = self.kwargs['origin']
            flight_dest = self.kwargs['destiny']
            flights_result = getOutFlights(flight_orig,flight_dest,out_date)
            # cond = ( flights_result != False) or flights_result
            cond = True
            
            return Response (flights_result if cond else {"error": "No flights Founded"})
        else:

            Flights = Flight.objects.all()
            serializer = FlightSerializer(Flights, many=True)
            return Response(serializer.data)
        
    def post(self):
        pass

    def put(self, request, *args, **kwargs):
        print(request.data)
        flight_id = request.data.get('id')
        flight_tiquets = request.data.get('tiquets')
        
        temp_flight = Flight.objects.get(id=flight_id)

        temp_serializer = FlightSerializer(temp_flight,many=False)
        temp_tiquets = temp_serializer.data['tiquets']

        newTiquets = (int(temp_tiquets) - int(flight_tiquets))
       
       
        serializer = FlightSerializer(instance=temp_flight, data={'tiquets':newTiquets }, partial=True)

        if serializer.is_valid(raise_exception=True):
            temp_flight = serializer.save()

        return Response({"success": "Flight '{}' updated successfully".format(temp_flight.tiquets)})