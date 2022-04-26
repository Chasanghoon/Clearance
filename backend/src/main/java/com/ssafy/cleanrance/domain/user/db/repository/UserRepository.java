package com.ssafy.cleanrance.domain.user.db.repository;

import com.ssafy.cleanrance.domain.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
