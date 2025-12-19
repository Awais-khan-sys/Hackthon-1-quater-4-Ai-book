---
sidebar_position: 3
title: "Humanoid Modeling with URDF"
---

# Humanoid Modeling with URDF

import LearningObjectives from '@site/src/components/LearningObjectives';

<LearningObjectives>
  <li>Create and modify URDF files with proper links, joints, and kinematic chains</li>
  <li>Understand how URDF integrates with ROS 2 control systems</li>
  <li>Identify different types of joints and their role in robotic kinematics</li>
</LearningObjectives>

> **Prerequisites**: This chapter builds on the concepts introduced in [ROS 2 Fundamentals](./fundamentals.md) and [ROS 2 Communication Patterns](./communication.md). Understanding nodes, topics, services, and actions is essential for grasping how URDF models integrate with ROS 2 control systems.

## Introduction to URDF

URDF (Unified Robot Description Format) is an XML-based format used to describe robot models in ROS. It defines the physical and visual properties of a robot, serving as a blueprint for how the robot is constructed. URDF is fundamental to robotics simulation, visualization, and control, as it provides ROS with detailed information about the robot's structure.

URDF files contain information about:
- The robot's physical structure (links and joints)
- Visual and collision properties
- Inertial properties for physics simulation
- Transmission information for actuators
- Safety controllers and limits

## Links: The Building Blocks of Robots

In URDF, a **link** represents a rigid body part of the robot. Each link has:

- Physical properties (mass, inertia, center of mass)
- Visual properties (shape, color, mesh)
- Collision properties (shape for collision detection)

### Example Link Definition

```xml
<link name="base_link">
  <inertial>
    <mass value="1.0" />
    <origin xyz="0 0 0" />
    <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01" />
  </inertial>
  <visual>
    <origin xyz="0 0 0" rpy="0 0 0" />
    <geometry>
      <cylinder radius="0.1" length="0.2" />
    </geometry>
    <material name="blue">
      <color rgba="0 0 1 1" />
    </material>
  </visual>
  <collision>
    <origin xyz="0 0 0" rpy="0 0 0" />
    <geometry>
      <cylinder radius="0.1" length="0.2" />
    </geometry>
  </collision>
</link>
```

This example defines a simple cylindrical base link with mass, visual representation, and collision properties.

## Joints: Connecting the Robot

A **joint** connects two links and defines how they can move relative to each other. Joints have types that determine their range of motion:

### Joint Types

1. **Fixed**: No movement between links (0 DOF)
2. **Revolute**: Rotational movement around an axis (1 DOF)
3. **Continuous**: Like revolute but unlimited rotation (1 DOF)
4. **Prismatic**: Linear sliding movement (1 DOF)
5. **Floating**: 6 DOF movement (3 translation, 3 rotation)
6. **Planar**: Movement on a plane (3 DOF)

### Example Joint Definition

```xml
<joint name="base_to_wheel" type="continuous">
  <parent link="base_link" />
  <child link="wheel_link" />
  <origin xyz="0.0 0.1 0.0" rpy="0 0 0" />
  <axis xyz="0 0 1" />
  <limit effort="10.0" velocity="1.0" />
</joint>
```

This example creates a continuous joint connecting a base link to a wheel link, allowing the wheel to rotate freely.

## Kinematic Chains

**Kinematic chains** are sequences of links connected by joints that define how parts of the robot move relative to each other. In humanoid robots, kinematic chains represent limbs like arms and legs.

### Forward Kinematics
Calculates the position and orientation of the end effector based on joint angles.

### Inverse Kinematics
Calculates the joint angles needed to achieve a desired end effector position.

## URDF for Humanoid Robots

Humanoid robots have complex kinematic structures with multiple limbs. A typical humanoid URDF includes:

- **Trunk**: The main body
- **Arms**: With shoulder, elbow, and wrist joints
- **Legs**: With hip, knee, and ankle joints
- **Head**: With neck joint for orientation

### Example Humanoid Structure

```
base_link
├── torso
│   ├── head
│   ├── left_arm
│   │   ├── left_forearm
│   │   └── left_hand
│   ├── right_arm
│   │   ├── right_forearm
│   │   └── right_hand
│   ├── left_leg
│   │   ├── left_lower_leg
│   │   └── left_foot
│   └── right_leg
│       ├── right_lower_leg
│       └── right_foot
```

## Integration with ROS 2 Control

URDF models integrate seamlessly with ROS 2 control systems through several mechanisms:

### Robot State Publisher

The `robot_state_publisher` node reads the URDF and publishes the robot's joint states and transforms, enabling visualization and navigation systems to understand the robot's configuration.

### Joint State Controller

This controller manages the state of robot joints, publishing information about joint positions, velocities, and efforts.

### Controllers

ROS 2 controllers use URDF information to understand robot kinematics and properly command joint movements.

## URDF Best Practices

When creating URDF files for humanoid robots:

1. **Start Simple**: Begin with basic shapes and add complexity gradually
2. **Use Proper Inertias**: Accurate inertial properties are crucial for simulation
3. **Validate Links**: Ensure all links have proper visual, collision, and inertial properties
4. **Organize Hierarchically**: Structure the URDF logically with clear parent-child relationships
5. **Test in Simulation**: Always verify your URDF works in simulation before physical implementation

## Practical URDF Examples

Let's look at some practical examples of URDF files that demonstrate the concepts we've discussed.

### Simple Mobile Robot Example

Here's a complete URDF file for a simple differential drive robot:

```xml
<?xml version="1.0"?>
<robot name="simple_robot">
  <!-- Base Link -->
  <link name="base_link">
    <inertial>
      <mass value="1.0" />
      <origin xyz="0 0 0" />
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02" />
    </inertial>
    <visual>
      <origin xyz="0 0 0.1" rpy="0 0 0" />
      <geometry>
        <box size="0.5 0.3 0.2" />
      </geometry>
      <material name="white">
        <color rgba="1 1 1 1" />
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.1" rpy="0 0 0" />
      <geometry>
        <box size="0.5 0.3 0.2" />
      </geometry>
    </collision>
  </link>

  <!-- Left Wheel -->
  <link name="left_wheel">
    <inertial>
      <mass value="0.2" />
      <origin xyz="0 0 0" />
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.002" />
    </inertial>
    <visual>
      <origin xyz="0 0 0" rpy="1.5708 0 0" />
      <geometry>
        <cylinder radius="0.1" length="0.05" />
      </geometry>
      <material name="black">
        <color rgba="0 0 0 1" />
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0" rpy="1.5708 0 0" />
      <geometry>
        <cylinder radius="0.1" length="0.05" />
      </geometry>
    </collision>
  </link>

  <!-- Right Wheel -->
  <link name="right_wheel">
    <inertial>
      <mass value="0.2" />
      <origin xyz="0 0 0" />
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.002" />
    </inertial>
    <visual>
      <origin xyz="0 0 0" rpy="1.5708 0 0" />
      <geometry>
        <cylinder radius="0.1" length="0.05" />
      </geometry>
      <material name="black">
        <color rgba="0 0 0 1" />
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0" rpy="1.5708 0 0" />
      <geometry>
        <cylinder radius="0.1" length="0.05" />
      </geometry>
    </collision>
  </link>

  <!-- Joints -->
  <joint name="left_wheel_joint" type="continuous">
    <parent link="base_link" />
    <child link="left_wheel" />
    <origin xyz="0 0.15 0" rpy="0 0 0" />
    <axis xyz="0 0 1" />
  </joint>

  <joint name="right_wheel_joint" type="continuous">
    <parent link="base_link" />
    <child link="right_wheel" />
    <origin xyz="0 -0.15 0" rpy="0 0 0" />
    <axis xyz="0 0 1" />
  </joint>
</robot>
```

### Humanoid Robot Example

Here's a simplified URDF for a basic humanoid robot arm:

```xml
<?xml version="1.0"?>
<robot name="simple_arm">
  <!-- Shoulder Link -->
  <link name="shoulder_link">
    <inertial>
      <mass value="0.5" />
      <origin xyz="0 0 0.1" />
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.0005" />
    </inertial>
    <visual>
      <origin xyz="0 0 0.1" rpy="0 0 0" />
      <geometry>
        <cylinder radius="0.05" length="0.2" />
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1" />
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.1" rpy="0 0 0" />
      <geometry>
        <cylinder radius="0.05" length="0.2" />
      </geometry>
    </collision>
  </link>

  <!-- Upper Arm -->
  <link name="upper_arm_link">
    <inertial>
      <mass value="0.3" />
      <origin xyz="0 0 0.15" />
      <inertia ixx="0.0005" ixy="0.0" ixz="0.0" iyy="0.0005" iyz="0.0" izz="0.0001" />
    </inertial>
    <visual>
      <origin xyz="0 0 0.15" rpy="0 0 0" />
      <geometry>
        <cylinder radius="0.04" length="0.3" />
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1" />
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.15" rpy="0 0 0" />
      <geometry>
        <cylinder radius="0.04" length="0.3" />
      </geometry>
    </collision>
  </link>

  <!-- Elbow Joint -->
  <joint name="elbow_joint" type="revolute">
    <parent link="shoulder_link" />
    <child link="upper_arm_link" />
    <origin xyz="0 0 0.2" rpy="0 0 0" />
    <axis xyz="0 1 0" />
    <limit lower="-1.57" upper="1.57" effort="10.0" velocity="1.0" />
  </joint>
</robot>
```

## Summary

URDF is the standard format for describing robot models in ROS 2, providing essential information about a robot's physical structure. Understanding how to create and modify URDF files is crucial for working with humanoid robots, as it defines how the robot exists in both simulation and the real world. Properly structured URDF files enable effective control, simulation, and visualization of complex robotic systems.

import ExerciseBox from '@site/src/components/ExerciseBox';

<ExerciseBox title="Exercise 1: URDF Structure Analysis">

Analyze the simple mobile robot URDF example and answer the following questions:

1. How many links does this robot have?
2. What type of joint connects the wheels to the base?
3. What is the purpose of the `<inertial>` tag in each link?
4. What would happen if you swapped the parent and child links in a joint definition?

**Answer Key:**
1. 3 links: base_link, left_wheel, right_wheel
2. Continuous joints (allowing unlimited rotation)
3. The `<inertial>` tag defines mass and inertia properties for physics simulation
4. The kinematic relationship would be reversed, which would cause incorrect robot behavior

</ExerciseBox>

<ExerciseBox title="Exercise 2: Modify the Robot URDF">

Extend the simple mobile robot URDF by adding:

1. A caster wheel at the front of the robot (positioned appropriately)
2. A simple box-shaped sensor mounted on top of the base
3. Proper inertial, visual, and collision properties for the new components

Think about how the new joints should be defined (fixed or moving) and where they should be positioned relative to the base link.

</ExerciseBox>

<ExerciseBox title="Exercise 3: Design Your Own Robot">

Design a simple 2-link robot arm in URDF with:

1. A base link that is fixed to the world
2. A rotating shoulder joint
3. An upper arm link
4. An elbow joint
5. A lower arm link

Include appropriate inertial properties, visual shapes, and joint limits. Consider what range of motion would be appropriate for each joint.

</ExerciseBox>

## Edge Cases and Different Robot Configurations

When working with URDF for humanoid robots, several edge cases and configuration variations need to be considered:

### Multi-Body Robots

Some robots have multiple base links or independent sections. For example, a robot with both a mobile base and a stationary arm would need careful consideration of which parts are connected to the world frame.

### Redundant Kinematic Chains

Humanoid robots sometimes have redundant kinematic chains (multiple ways to reach the same position). These require special consideration in control algorithms and can cause issues if not properly modeled.

### Flexible vs. Rigid Links

While URDF assumes rigid links, some robots have flexible components. For these, the model must approximate the flexibility using multiple small rigid links connected by joints with low effort limits.

### Different Locomotion Types

Humanoid robots can have different locomotion methods:
- **Bipedal**: Walking on two legs (most complex)
- **Quadrupedal**: Walking on four legs (more stable)
- **Wheeled**: Using wheels instead of legs (simpler control)
- **Tracked**: Using treads (good for rough terrain)

Each type requires different joint configurations and control strategies.

### Asymmetric Robots

Not all humanoid robots are perfectly symmetric. Some have different arms (e.g., one with a gripper, one with a camera) or other asymmetric features that require careful modeling.

### Dynamic Reconfiguration

Some robots can change their configuration during operation (e.g., extending arms, changing wheel configurations). URDF typically models a single configuration, so multiple URDF files or complex joint limits may be needed.

## Connecting to Communication Knowledge

This chapter builds on the communication patterns we learned in Chapter 2. In real robotic systems, URDF models are used alongside the communication infrastructure to create complete robotic applications:

- The robot's URDF defines its structure, which is published via the robot state publisher
- Joint states are communicated using the topic pattern (publishing joint positions to `/joint_states`)
- Controllers use services to set parameters or request specific actions
- Complex manipulation tasks may use actions for coordinated multi-joint movements with feedback

Understanding both URDF modeling and communication patterns is essential for creating complete humanoid robotic systems that connect AI agents to physical robots.

## Next Steps

Congratulations! You've completed the ROS 2 Fundamentals Module. You now understand:

- The fundamental concepts of ROS 2
- The communication patterns used in ROS 2
- How to model robots using URDF

[Previous: ROS 2 Communication Patterns](../communication)