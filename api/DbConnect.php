<?php
	/**
	* Database Connection
	*/
	class DbConnect {
		private $server = '127.0.0.1:3306';
		private $dbname = 'u534485265_crud';
		private $user = 'u534485265_pablomv';
		private $pass = 'Pabloviana123!';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
?>