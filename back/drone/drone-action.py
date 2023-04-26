import asyncio
from tkinter import *
from turtle import home
from async_tkinter_loop import async_handler, async_mainloop
from mavsdk import *
from mavsdk import System
from mavsdk.offboard import (OffboardError, PositionNedYaw)
from mavsdk.mission import (MissionItem, MissionPlan)
import time
import webbrowser

lastPacketTime=time.time()-10
def hyperLink(url):
    webbrowser.open_new(url)

connected = False

async def setup(drone):
    """
    General configurations, setups, and connections are done here.
    :return:
    """
    printPxh("Connecting to drone...")
    portIn = 14540
    await drone.connect(system_address="udp://:"+ str(portIn))

    printPxh("Waiting for drone to connect...")
    global state
    global lastPacketTime
    global health

    async for state in drone.core.connection_state():
        lastPacketTime=time.time()
        if state.is_connected:
            printPxh(f"-- Connected to drone!")
            printPxh(f"-- Connected int port: {portIn}")
            connected = True
            break

    printPxh("Waiting for drone to have a global position estimate...")    

async def takeoff(drone,alt):
    """
    Arms the drone and takes off to the specified altitude.
    :param alt: Altitude in meters
    """
    printPxh("-- Arming")
    await drone.action.arm()
    printPxh("-- Taking off")
    await drone.action.set_takeoff_altitude(alt)
    await drone.action.takeoff()

async def goto_position(drone,alt,lat,long):
    """
    Arms the drone and takes off to the specified altitude.
    :param alt: Altitude in meters
    :param lat: Latitude in degrees
    :param long: Longitude in degrees
    """

    if not connected:
        await setup(drone)
    printPxh("-- Going to: " + str(lat) + ", " + str(long) + " at " + str(alt) + "m")
    await drone.action.set_takeoff_altitude(alt)
    await drone.action.arm()
    await drone.action.takeoff()
    await drone.action.goto_location(float(lat), float(long), alt, 0)
    printPxh("-- Arrived at: " + str(lat)  + ", " + str(long))

async def goto_coordinates(drone,coordinates):
    """
    Moves the drone to the specified coordinates.
    :param coordinates: List of dictionaries containing the latitude, longitude, and altitude of the coordinates.
    """
    mission_items = []
    for coordinate in coordinates:
        if not connected:
            await setup(drone)
        alt = coordinate["altitude"]
        long = coordinate["longitude"]
        lat = coordinate["latitude"]

        mission_items.append(MissionItem(lat,
                                     long,
                                     alt,
                                     10,
                                     True,
                                     float('nan'),
                                     float('nan'),
                                     MissionItem.CameraAction.TAKE_PHOTO,
                                     float('nan'),
                                     float('nan'),
                                     float('nan'),
                                     float('nan'),
                                     float('nan')))
    
    mission_plan = MissionPlan(mission_items)
    printPxh("-- Uploading mission")
    await drone.mission.upload_mission(mission_plan)
    await drone.action.arm()
    printPxh("-- Starting mission")
    await drone.mission.start_mission()
    printPxh("-- Arrived at: " + str(lat)  + ", " + str(long))


def printPxh(msg=""):
    print(msg)

    




