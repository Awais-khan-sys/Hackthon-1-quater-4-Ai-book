---
sidebar_position: 1
title: "ROS 2 Fundamentals"
---

# ROS 2 Fundamentals

import LearningObjectives from '@site/src/components/LearningObjectives';

<LearningObjectives>
  <li>Understand the role of ROS 2 as middleware connecting AI agents to humanoid robots</li>
  <li>Identify the core concepts of nodes, topics, and services</li>
  <li>Explain how ROS 2 serves as the nervous system for robotic systems</li>
</LearningObjectives>

## The Role of ROS 2 in Physical AI

ROS 2 (Robot Operating System 2) serves as the middleware that connects AI agents to humanoid robots, enabling seamless communication and control between high-level artificial intelligence and physical robotic systems. Think of ROS 2 as the "nervous system" of robotic platforms, facilitating the flow of information and commands between different components of a robotic system.

In the context of Physical AI, ROS 2 plays a critical role in bridging the gap between abstract AI algorithms and the physical world. It provides:

- **Standardized communication**: A consistent way for different software components to exchange information
- **Hardware abstraction**: A layer that allows AI algorithms to interact with different robot hardware without modification
- **Distributed computing**: Support for running different parts of a robotic system on different computers
- **Real-time capabilities**: Support for time-sensitive operations required for robot control

### Key Concepts

In ROS 2, the fundamental building blocks are:

- **Nodes**: Individual processes that perform computation
- **Topics**: Communication channels for continuous data streams
- **Services**: Request-response communication patterns for discrete interactions

These concepts will be explored in detail in the following sections.

### Why ROS 2 for Physical AI?

ROS 2 is particularly well-suited for Physical AI applications because:

1. **Middleware Architecture**: It provides a communication layer that allows AI agents to control robots without knowing the low-level hardware details.

2. **Scalability**: ROS 2's distributed architecture allows complex robotic systems to be built from smaller, manageable components.

3. **Real-time Performance**: With real-time capabilities, ROS 2 can support time-critical robot control tasks.

4. **Security**: Built-in security features make ROS 2 suitable for deployment in real-world environments.

5. **Ecosystem**: A rich ecosystem of tools, libraries, and community support accelerates development.

## Understanding ROS 2 Nodes

### What is a Node?

A **node** is a fundamental building block in ROS 2 that represents a single executable process. Nodes perform specific computational tasks and communicate with other nodes through topics, services, and actions. Think of nodes as individual workers in a robotic system, each responsible for a specific function.

### Characteristics of Nodes

- **Independent**: Each node runs as a separate process
- **Specialized**: Each node typically performs one primary function
- **Communicative**: Nodes communicate with other nodes using ROS 2 communication primitives
- **Lightweight**: Nodes are designed to be small and focused

### Example of Nodes in a Robot System

A simple mobile robot might have the following nodes:

- **Laser Driver Node**: Reads data from a laser scanner
- **Navigation Node**: Plans paths for the robot to follow
- **Motor Controller Node**: Controls the robot's wheels based on commands
- **Sensor Fusion Node**: Combines data from multiple sensors

### Creating a Simple Node in Python

Here's a basic example of a ROS 2 node written in Python:

```python
import rclpy
from rclpy.node import Node

class SimpleNode(Node):
    def __init__(self):
        super().__init__('simple_node')
        self.get_logger().info('Simple Node has been started')

def main(args=None):
    rclpy.init(args=args)
    node = SimpleNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This example demonstrates the basic structure of a ROS 2 node in Python, including initialization, logging, and the main execution loop.

## Understanding ROS 2 Topics

### What is a Topic?

A **topic** is a communication channel in ROS 2 that enables one-way data flow from publishers to subscribers. Topics implement a publish-subscribe pattern, where nodes can publish messages to a topic and other nodes can subscribe to that topic to receive the messages. Topics are ideal for continuous data streams such as sensor readings, robot state information, or camera images.

### Characteristics of Topics

- **Asynchronous**: Publishers and subscribers don't need to be synchronized
- **Many-to-many**: Multiple publishers can send to a topic, and multiple subscribers can receive from it
- **Data-driven**: Communication is triggered by new data rather than requests
- **Typed**: Messages on a topic have a specific, predefined data type

### Example of Topics in a Robot System

Common uses of topics in robotics include:

- **/scan**: Laser scanner readings
- **/camera/image_raw**: Raw camera images
- **/imu/data**: Inertial measurement unit data
- **/tf**: Transform data showing relationships between coordinate frames
- **/cmd_vel**: Velocity commands for robot movement

### Creating a Publisher and Subscriber in Python

Here's an example of a publisher and subscriber for a simple topic:

**Publisher:**
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.get_clock().now().nanoseconds
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()
```

**Subscriber:**
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()
```

This example shows how a publisher sends messages to a topic and a subscriber receives them asynchronously.

## Understanding ROS 2 Services

### What is a Service?

A **service** is a communication pattern in ROS 2 that implements a request-response interaction between nodes. Unlike topics, which provide asynchronous, one-way communication, services provide synchronous, two-way communication. A client node sends a request to a service, and the service processes the request and sends back a response. Services are ideal for discrete interactions where a specific response is expected.

### Characteristics of Services

- **Synchronous**: The client waits for a response from the service
- **Request-Response**: Communication follows a clear request-response pattern
- **One-to-one**: Typically one service server handles requests from clients
- **Blocking**: The client is blocked until the response is received
- **Typed**: Both request and response messages have specific, predefined data types

### Example of Services in a Robot System

Common uses of services in robotics include:

- **/set_parameters**: Change configuration parameters
- **/save_map**: Save a map of the environment
- **/get_map**: Retrieve a previously saved map
- **/reset_positions**: Reset robot odometry
- **/trigger_camera**: Capture an image from a camera

### Creating a Service Server and Client in Python

Here's an example of a service server and client:

**Service Server:**
```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\na: %d b: %d' % (request.a, request.b))
        return response

def main(args=None):
    rclpy.init(args=args)
    minimal_service = MinimalService()
    rclpy.spin(minimal_service)
    rclpy.shutdown()
```

**Service Client:**
```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class MinimalClient(Node):
    def __init__(self):
        super().__init__('minimal_client')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, future)
        return future.result()

def main(args=None):
    rclpy.init(args=args)
    minimal_client = MinimalClient()
    response = minimal_client.send_request(1, 2)
    minimal_client.get_logger().info(
        'Result of add_two_ints: for %d + %d = %d' %
        (1, 2, response.sum))
    minimal_client.destroy_node()
    rclpy.shutdown()
```

This example demonstrates how a service client sends a request to a service server and waits for the response, which contains the sum of two integers.

## Next Steps

Now that you understand the fundamental concepts of ROS 2, continue to the next chapter to explore communication patterns in greater detail:

[Next: ROS 2 Communication Patterns](../communication)

[Previous: Introduction](../../intro)

## Comparing Communication Patterns

### When to Use Each Pattern

Understanding when to use nodes, topics, and services is crucial for designing effective robotic systems:

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Nodes** | Encapsulate specific functionality | A navigation node that plans robot paths |
| **Topics** | Continuous data streams | Sensor readings, robot state, camera feeds |
| **Services** | Discrete, request-response interactions | Saving maps, changing parameters, triggering actions |

### Practical Example: Mobile Robot Navigation

Let's consider a practical example of how these concepts work together in a mobile robot navigation system:

1. **Nodes**:
   - `laser_scan_node`: Reads laser scanner data
   - `map_server_node`: Provides map data
   - `move_base_node`: Plans and executes navigation
   - `cmd_vel_mux_node`: Manages velocity commands

2. **Topics**:
   - `/scan`: Laser scan data published by the laser node
   - `/map`: Static map data published by the map server
   - `/cmd_vel`: Velocity commands sent to the robot's base controller
   - `/tf`: Transform data showing robot's position and orientation

3. **Services**:
   - `/move_base/clear_costmaps`: Service to clear navigation costmaps
   - `/map_server/load_map`: Service to load different maps
   - `/global_localization`: Service to reset robot's estimated position

This example shows how nodes, topics, and services work together to create a cohesive navigation system.

## Summary

In this chapter, we've explored the fundamental concepts of ROS 2:

- **Nodes** as the basic computational units
- **Topics** for asynchronous, one-way communication
- **Services** for synchronous, request-response communication

These building blocks form the foundation of all ROS 2 applications, enabling the creation of complex robotic systems through the composition of simpler, specialized components.

import ExerciseBox from '@site/src/components/ExerciseBox';

<ExerciseBox title="Exercise 1: Identifying Communication Patterns">

Consider a robotic vacuum cleaner. Identify which communication pattern (topic or service) would be most appropriate for each of the following:

1. Publishing sensor data about detected obstacles
2. Requesting the robot to return to its charging station
3. Broadcasting the robot's current battery level
4. Requesting a room map from the mapping system
5. Publishing the robot's current location

**Answer Key:**
1. Topic - continuous sensor data stream
2. Service - discrete request with response expected
3. Topic - continuous status updates
4. Service - request-response pattern
5. Topic - continuous location updates

</ExerciseBox>

<ExerciseBox title="Exercise 2: Node Design">

Design a simple robot system with the following capabilities:
- Detect objects using a camera
- Move to a specific location
- Announce its status

For each capability, identify:
1. What would be a suitable node name?
2. What topics or services would this node use?
3. Would it be a publisher, subscriber, service server, or service client?

**Example Answer for Object Detection:**
1. Node name: `object_detection_node`
2. Topics: `/camera/image_raw` (subscriber), `/detected_objects` (publisher)
3. Role: Both subscriber (to camera data) and publisher (of detection results)

</ExerciseBox>

<ExerciseBox title="Exercise 3: System Architecture">

Imagine you want to build a simple robot that moves to a specified location when a button is pressed on a remote control. The robot has the following components:
- A button that publishes when pressed
- A navigation system
- A motor controller

Design the communication architecture:
1. What nodes would you create?
2. What topics/services would connect them?
3. How would the system flow work from button press to robot movement?

**Answer Key:**
1. Nodes: `button_node`, `navigation_node`, `motor_controller_node`
2. Topics: `/button_pressed` (from button to navigation), `/cmd_vel` (from navigation to motor controller)
3. Flow: Button press → `/button_pressed` topic → Navigation node calculates path → `/cmd_vel` topic → Motor controller moves robot

</ExerciseBox>

## Next Steps

Now that you understand the fundamental concepts of ROS 2, continue to the next chapter to explore communication patterns in greater detail:

[Next: ROS 2 Communication Patterns](../communication)

[Previous: Introduction](../../intro)