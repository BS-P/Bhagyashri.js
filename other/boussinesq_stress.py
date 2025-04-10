import math

def boussinesq_stress(Q, z, r):
    """
    Computes vertical pressure using Boussinesq's equation

    Parameters:
    Q : float : Applied load in kN
    z : float : Depth below the load in meters
    r : float : Horizontal distance in meters

    Returns:
    float : Vertical stress in kN/m²
    """

    sigma_z = (3 * Q) / (2 * math.pi * z**2) * (1 / ((1 + (r**2 / z**2))**(5/2)))
    return sigma_z

# Given Data
Q = 1000  # Load in kN

# Case 1: Depth = 4m, Distance = 0m (Directly below the Load)
z1 = 4
r1 = 0
stress_1 = boussinesq_stress(Q, z1, r1)
print("The vertical pressure at a depth of {} meters and at a distance of {} meter from the load "
"is {:.2f}kN/m²".format(z1, r1, stress_1))
