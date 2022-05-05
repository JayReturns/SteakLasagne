package com.github.jayreturns.slserver.User.repository;

import com.github.jayreturns.slserver.User.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
