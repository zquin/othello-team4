package com.allstate.compozed.othello.repository;

import com.allstate.compozed.othello.domain.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by localadmin on 4/3/17.
 */
public interface UserRepository extends CrudRepository<User,Long>{
    public User findByEmailAddress(String emailAddress);
}
