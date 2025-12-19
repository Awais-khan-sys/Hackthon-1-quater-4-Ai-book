---
sidebar_position: 2
title: "ROS 2 Communication Patterns"
---

# ROS 2 Communication Patterns

import LearningObjectives from '@site/src/components/LearningObjectives';

<LearningObjectives>
  <li>Distinguish between Topics, Services, and Actions in ROS 2 communication</li>
  <li>Implement Python agents that publish to topics and call services using rclpy</li>
  <li>Understand when to use each communication pattern for different robotic tasks</li>
</LearningObjectives>

> **Prerequisites**: This chapter builds on the fundamental concepts of ROS 2 introduced in [ROS 2 Fundamentals](./fundamentals.md). If you're new to ROS 2, we recommend reviewing that chapter first to understand the basic concepts of nodes and the role of ROS 2 in Physical AI.

## Introduction to Communication Patterns

ROS 2 provides three primary communication patterns for exchanging information between nodes, each designed for specific use cases and interaction styles. Understanding when and how to use each pattern is crucial for developing effective robotic applications.

Communication in ROS 2 is designed to be flexible and robust, supporting everything from simple sensor data publication to complex, long-running robotic tasks. The choice of communication pattern affects how nodes interact, how data flows through the system, and how the robot responds to various events and commands.

## Topics vs Services vs Actions

ROS 2 provides three primary communication patterns for exchanging information between nodes:

### Topics - Publish-Subscribe Pattern

Topics implement a publish-subscribe pattern, ideal for continuous data streams like sensor readings or robot state information. Key characteristics include:

- **Asynchronous**: Publishers and subscribers don't need to be synchronized
- **Many-to-many**: Multiple publishers can send to a topic, multiple subscribers can receive
- **Data-driven**: Communication is triggered by new data rather than requests
- **Best for**: Continuous data streams, sensor readings, robot state, camera feeds

### Services - Request-Response Pattern

Services use a request-response pattern, suitable for discrete interactions where a specific response is expected. Key characteristics include:

- **Synchronous**: The client waits for a response from the service
- **Request-Response**: Clear request-response communication flow
- **Blocking**: The client is blocked until the response is received
- **Best for**: Discrete interactions, configuration changes, triggering actions

### Actions - Long-Running Tasks

Actions handle long-running tasks with feedback and goal management capabilities. Key characteristics include:

- **Goal-based**: Clients send goals to action servers
- **Feedback**: Continuous feedback during task execution
- **Preemption**: Tasks can be canceled or preempted
- **Best for**: Navigation, manipulation, calibration, complex robot behaviors

## Detailed Comparison

| Pattern | Communication Style | Best Use Cases | Example |
|---------|-------------------|----------------|---------|
| **Topics** | Publish-Subscribe | Continuous data streams | `/scan`, `/camera/image_raw`, `/tf` |
| **Services** | Request-Response | Discrete interactions | `/save_map`, `/set_parameters`, `/get_map` |
| **Actions** | Goal-Feedback-Result | Long-running tasks | `/move_base`, `/arm_controller/follow_joint_trajectory` |

## Python Implementation with rclpy

The rclpy library provides Python bindings for ROS 2, enabling Python agents to interact with ROS 2 systems through publishers, subscribers, clients, and services. Let's explore implementation examples for each communication pattern.

### Topics Implementation

Here's a complete example of a publisher and subscriber for topics:

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

### Services Implementation

Here's a complete example of a service server and client:

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

### Actions Implementation

Actions are more complex and involve three message types: goal, feedback, and result. Here's an example of an action server and client:

**Action Server:**
```python
import time
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node
from example_interfaces.action import Fibonacci

class FibonacciActionServer(Node):

    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')

        feedback_msg = Fibonacci.Feedback()
        feedback_msg.sequence = [0, 1]

        for i in range(1, goal_handle.request.order):
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().info('Goal canceled')
                return Fibonacci.Result()

            feedback_msg.sequence.append(
                feedback_msg.sequence[i] + feedback_msg.sequence[i-1])
            self.get_logger().info('Feedback: {0}'.format(feedback_msg.sequence))
            goal_handle.publish_feedback(feedback_msg)

            time.sleep(1)

        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.sequence
        self.get_logger().info('Returning result: {0}'.format(result.sequence))

        return result

def main(args=None):
    rclpy.init(args=args)
    fibonacci_action_server = FibonacciActionServer()
    rclpy.spin(fibonacci_action_server)
    fibonacci_action_server.destroy_node()
    rclpy.shutdown()
```

**Action Client:**
```python
import time
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
from example_interfaces.action import Fibonacci

class FibonacciActionClient(Node):

    def __init__(self):
        super().__init__('fibonacci_action_client')
        self._action_client = ActionClient(
            self,
            Fibonacci,
            'fibonacci')

    def send_goal(self, order):
        goal_msg = Fibonacci.Goal()
        goal_msg.order = order

        self._action_client.wait_for_server()
        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback)

        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected :(')
            return

        self.get_logger().info('Goal accepted :)')

        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info('Received feedback: {0}'.format(feedback.sequence))

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info('Result: {0}'.format(result.sequence))
        rclpy.shutdown()

def main(args=None):
    rclpy.init(args=args)
    action_client = FibonacciActionClient()
    action_client.send_goal(10)
    rclpy.spin(action_client)
```

## When to Use Each Communication Pattern

Choosing the right communication pattern is critical for creating efficient and maintainable ROS 2 systems:

### Use Topics When:
- You need to broadcast information to multiple subscribers
- Data is continuously generated (sensors, state information)
- You don't need confirmation that messages were received
- Real-time performance is important

### Use Services When:
- You need a specific response to a request
- The interaction is discrete and relatively quick
- You need to modify parameters or trigger specific actions
- You want synchronous communication

### Use Actions When:
- You have long-running tasks that provide feedback
- You need the ability to cancel or preempt tasks
- You're performing complex robot behaviors
- You need to track the progress of a task over time

## Summary

Understanding the differences between topics, services, and actions is fundamental to designing effective robotic systems in ROS 2. Each pattern serves a specific purpose and choosing the right one for your use case will make your robot more responsive, maintainable, and efficient.

import ExerciseBox from '@site/src/components/ExerciseBox';

<ExerciseBox title="Exercise 1: Communication Pattern Selection">

For each scenario below, identify which communication pattern (Topic, Service, or Action) would be most appropriate and explain why:

1. A robot's laser scanner continuously publishing distance measurements
2. Requesting the robot to navigate to a specific location (x, y coordinates)
3. A camera publishing image frames for computer vision processing
4. Requesting the robot to save its current map of the environment
5. Moving a robot arm to pick up an object with continuous feedback on progress
6. Publishing the robot's current battery level
7. Requesting to reset the robot's odometry

**Answer Key:**
1. Topic - Continuous sensor data stream
2. Action - Long-running task with potential for feedback and cancellation
3. Topic - Continuous data stream
4. Service - Discrete request-response interaction
5. Action - Long-running task requiring feedback
6. Topic - Continuous status updates
7. Service - Discrete request with response expected

</ExerciseBox>

<ExerciseBox title="Exercise 2: Implementation Challenge">

Create a simple ROS 2 node that implements both a publisher and a subscriber:

1. Create a publisher that publishes "Hello World" messages to a topic called `/greetings` every 2 seconds
2. Create a subscriber that listens to the `/greetings` topic and logs the received messages
3. Include the necessary imports, node class, and main function

Try to implement this yourself before looking at the solution in the previous examples.

</ExerciseBox>

<ExerciseBox title="Exercise 3: Service Implementation">

Design a simple service that calculates the distance between two points in 2D space:

1. Define the service request (two points with x, y coordinates)
2. Define the service response (distance as a float)
3. Implement the service server that calculates Euclidean distance
4. Implement a service client that calls the service with sample coordinates

This exercise combines understanding of service implementation with basic geometry concepts relevant to robotics.

</ExerciseBox>

## Real-World Examples: AI Agents Controlling Robots

Communication patterns in ROS 2 are essential for connecting AI agents with physical robots. Let's explore some real-world examples where AI agents use these patterns to control robots:

### Autonomous Delivery Robots

In autonomous delivery robots, AI agents use multiple communication patterns:

- **Topics**: The AI agent subscribes to `/camera/image_raw` and `/scan` topics to receive sensor data for navigation decisions
- **Services**: The AI agent calls `/move_base/clear_costmaps` service when it detects the robot is stuck
- **Actions**: The AI agent sends goals to `/move_base` action server to navigate to delivery locations

### AI-Powered Warehouse Automation

Warehouse robots controlled by AI systems use:

- **Topics**: Continuous monitoring of inventory sensors via `/inventory_updates` topic
- **Services**: Calling `/update_robot_status` service to report current task completion
- **Actions**: Using `/pick_place_action` for complex manipulation tasks with feedback on grasp success

### Social Robotics

Social robots with AI companions use:

- **Topics**: Subscribing to `/speech_recognition` topic to receive voice commands
- **Services**: Calling `/generate_response` service to get AI-generated responses
- **Actions**: Using `/move_head_to_point` action to direct the robot's attention with feedback on completion

### AI-Driven Quality Inspection

Industrial robots for quality control:

- **Topics**: Publishing inspection results to `/quality_results` topic for monitoring systems
- **Services**: Calling `/calibrate_camera` service to adjust vision system parameters
- **Actions**: Using `/inspect_part` action for detailed inspection procedures with continuous feedback on progress

### Healthcare Robotics

AI-controlled robots in healthcare environments:

- **Topics**: Receiving patient vital signs from monitoring devices via `/patient_data` topic
- **Services**: Calling `/request_emergency_assistance` service in critical situations
- **Actions**: Using `/escort_patient` action for guided movement with continuous feedback on patient's status

These examples demonstrate how AI agents leverage ROS 2 communication patterns to interact with and control robotic systems in various real-world applications. The choice of communication pattern directly impacts the responsiveness, reliability, and effectiveness of the AI-robot collaboration.

## Connecting to Fundamental Concepts

This chapter builds directly on the fundamental concepts introduced in Chapter 1. Recall that in the ROS 2 fundamentals, we learned about:

- **Nodes** as the basic computational units that perform specific tasks
- **Communication patterns** that enable nodes to exchange information

In this chapter, we're diving deeper into the three primary communication patterns that nodes use to interact with each other. The examples we've explored show how nodes implementing publishers, subscribers, service clients, and service servers work together to create complex robotic behaviors.

Just as we saw in Chapter 1 with the mobile robot navigation example, real-world robotic systems combine multiple communication patterns within a network of nodes. For instance, a delivery robot might have:

- A sensor node that publishes laser scan data to the `/scan` topic (topic communication)
- A navigation node that provides path planning service via `/move_base` (service communication)
- A battery monitoring node that publishes charge level to `/battery_state` topic (topic communication)
- A high-level task manager that coordinates all these components

Understanding how these patterns work together is essential for designing effective robotic systems that connect AI agents to physical robots.

## Next Steps

Now that you understand the communication patterns in ROS 2, continue to the next chapter to learn about robot modeling with URDF:

[Next: Humanoid Modeling with URDF](../urdf-modeling)

[Previous: ROS 2 Fundamentals](../fundamentals)