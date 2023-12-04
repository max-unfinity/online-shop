<?php
include 'db_connect.php'; // Include your DB connection script

$sql = "SELECT item_photo, item_name, item_description, price FROM products"; // Update with your table and column names
$result = $conn->query($sql);

$products = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
} else {
    echo "0 results";
}
$conn->close();
?>
